"use server";

import { getSignedUrlForUpload } from "@/lib/getSignedUrlForUpload";

export async function startUpload({ filename }: { filename: string }) {
  const result = await getSignedUrlForUpload({ filename });
  return result.url;
}
