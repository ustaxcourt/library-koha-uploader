import * as Sentry from "@sentry/nextjs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { DocType } from "@/types/DocType";
import { getFilename } from "./getFilename";

export type PersistenceGetSignedUrlForUploadResult = {
  url: string;
};

export type PersistenceGetSignedUrlForUpload = ({
  filename,
  folderName,
  docType,
}: {
  filename: string;
  folderName?: string;
  docType: DocType;
}) => Promise<string>;

export const getSignedUrlForUpload: PersistenceGetSignedUrlForUpload = async ({
  filename,
  folderName,
  docType,
}) => {
  const Key = getFilename({ filename, docType, folderName });
  const Bucket =
    docType === "JCT"
      ? process.env.S3_BUCKET_JCT
      : process.env.S3_BUCKET_HEARINGS;

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  const exists = await checkIfFileExists({ client, Bucket, Key });
  console.log("getSignedUrlForUpload", { exists });

  if (exists) {
    throw new Error("File already exists");
  }
  try {
    const url = await createSignedUrl({ client, Bucket, Key });
    return url;
  } catch (error) {
    Sentry.captureException(error);
    throw new Error("Unable to get pre-signed URL for uploading to S3");
  }
};

const checkIfFileExists = async ({
  client,
  Bucket,
  Key,
}: {
  client: S3Client;
  Bucket: string;
  Key: string;
}) => {
  const command = new HeadObjectCommand({
    Bucket,
    Key,
  });
  try {
    const res = await client.send(command);
    console.log("checkIfFileExists", res);
    return true;
  } catch (error) {
    return false;
  }
};

const createSignedUrl = async ({
  client,
  Bucket,
  Key,
}: {
  client: S3Client;
  Bucket: string;
  Key: string;
}) => {
  const command = new PutObjectCommand({
    ACL: "bucket-owner-full-control",
    Bucket,
    Key,
    StorageClass: "INTELLIGENT_TIERING",
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  return url;
};
