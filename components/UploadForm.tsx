"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { useEffect } from "react";

export default function UploadForm() {
  const files = useFiles([]);
  const kohaNumber = useInput();
  const filename = useInput();

  const fixFilename = (fn: string) => {
    const [basename, extension] = fn.split(".");
    const newBasename = basename.replace(/-\d+$/, "");
    return [newBasename, extension].join(".");
  };

  useEffect(() => {
    const uploadedFilename = files.value.length > 0 ? files.value[0].name : "";
    const fixedFilename = fixFilename(uploadedFilename);
    const newFilename =
      kohaNumber.value && uploadedFilename
        ? [kohaNumber.value, fixedFilename].join("-")
        : "";
    filename.setValue(newFilename);

    console.log("hello");
    console.log(files.value);
  }, [files.value, kohaNumber.value, filename]);
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label>Upload your file here</label>
        <FileUpload {...files} />
      </div>
      <div className="flex flex-col gap-2">
        <label>KOHA Number</label>
        <input className="text-slate-800 p-2" type="text" {...kohaNumber} />
      </div>
      <div className="flex flex-col gap-2">
        <label>Filename</label>
        <input
          className="text-slate-800 p-2 max-w-5xl w-full"
          type="text"
          value={filename.value}
        />
      </div>
    </div>
  );
}
