"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { useEffect } from "react";

export default function UploadForm() {
  const files = useFiles([]);
  const kohaNumber = useInput();
  const kohaBiblio = useInput();
  const filename = useInput();

  useEffect(() => {
    const newFilename = [
      kohaNumber.value,
      kohaBiblio.value,
      files.value[0].name,
    ].join("-");
    filename.setValue(newFilename);

    console.log("hello");
    console.log(files.value);
  }, [files.value, kohaNumber.value, kohaBiblio.value, filename]);
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
        <label>KOHA Biblio</label>
        <input className="text-slate-800 p-2" type="text" {...kohaBiblio} />
      </div>
      <div className="flex flex-col gap-2">
        <label>Filename</label>
        <input
          className="text-slate-800 p-2 max-w-5xl w-full"
          type="text"
          {...filename}
        />
      </div>
    </div>
  );
}
