"use server";

import { getSignedUrlForUpload } from "@/lib/getSignedUrlForUpload";
import { DocType } from "@/types/DocType";

export async function startUpload({
  filename,
  folderName,
  docType
}: {
  filename: string,
  folderName: string,
  docType: DocType
}) {
  const result = await getSignedUrlForUpload({ filename, folderName, docType });
  return result.url;
}
