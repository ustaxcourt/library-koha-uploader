"use server";

import { getSignedUrlForUpload } from "@/lib/getSignedUrlForUpload";
import { DocType } from "@/types/DocType";
import { NextResponse } from "next/server";

export async function startUpload({
  filename,
  folderName,
  docType,
}: {
  filename: string;
  folderName: string;
  docType: DocType;
}) {
  try {
    const url = await getSignedUrlForUpload({ filename, folderName, docType });
    return { url };
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }
    return { error: "An unknown error has occurred" };
  }
}
