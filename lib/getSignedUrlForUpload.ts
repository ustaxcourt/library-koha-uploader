import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { DocType } from "@/types/DocType";
import { getFilename } from "./getFilename";

export type PersistenceGetSignedUrlForUploadResult = {
  url: string;
};

export type PersistenceGetSignedUrlForUpload = ({
  filename,
  folderName,
  docType
}: {
  filename: string;
  folderName?: string;
  docType: DocType;

}) => Promise<PersistenceGetSignedUrlForUploadResult>;

export const getSignedUrlForUpload: PersistenceGetSignedUrlForUpload = async ({
  filename,
  folderName,
  docType
}) => {

  const Key = getFilename({ filename, docType, folderName });
  const Bucket = docType === "JCT" ? process.env.S3_BUCKET_JCT : process.env.S3_BUCKET_HEARINGS;

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  const command = new PutObjectCommand({
    ACL: "public-read",
    Bucket,
    Key,
    StorageClass: "INTELLIGENT_TIERING",
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  return { url };
};
