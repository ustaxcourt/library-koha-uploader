"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react";

export default function UploadForm() {
  const files = useFiles([]);
  const kohaNumber = useInput();
  const [filename, setFilename] = useState("");

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
        ? ["koha", kohaNumber.value, fixedFilename].join("-")
        : "";
    setFilename(newFilename);
  }, [files.value, kohaNumber.value]);

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
          defaultValue={filename}
        />
      </div>
    </div>
  );
}
