import { DocType } from "@/types/DocType";

export const getFilename = ({ filename, docType, folderName }: { filename: string, docType: DocType, folderName?: string }) => {
  return docType === "JCT" ? `${folderName}/${filename}` : filename;
}
