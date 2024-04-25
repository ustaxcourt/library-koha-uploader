import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export type PersistenceGetSignedUrlForUploadResult = {
  url: string;
};

export type PersistenceGetSignedUrlForUpload = ({
  filename,
}: {
  filename: string;
}) => Promise<PersistenceGetSignedUrlForUploadResult>;

export const getSignedUrlForUpload: PersistenceGetSignedUrlForUpload = async ({
  filename,
}) => {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
  });
  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  return { url };
};
