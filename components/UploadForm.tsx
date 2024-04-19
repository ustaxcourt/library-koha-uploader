"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();

  const usersWhoCanLogin = [
    "michael.marcotte@ustaxcourt.gov",
    "allison.tyous@ustaxcourt.gov",
    "erin.fernandes@ustaxcourt.gov",
  ];

  return (
    <div>
      {session?.user && session?.user?.name === "Michael Marcotte" ? (
        <div>
          <UploadForm2 />
        </div>
      ) : (
        <div>They are not logged in</div>
      )}
    </div>
  );
}

const UploadForm2 = () => {
  const files = useFiles([]);
  const kohaBiblio = useInput();
  const filename = useInput();

  const fixFilename = (fn: string) => {
    const [basename, extension] = fn.split(".");
    const newBasename = basename.replace(/-\d+$/, "");
    return [newBasename, extension].join(".");
  };

  useEffect(() => {
    const uploadedFilename = files.value.length > 0 ? files.value[0].name : "";
    const fixedFilename = fixFilename(uploadedFilename);
    const newFilename = ["koha", kohaBiblio.value, fixedFilename].join("-");
    filename.setValue(newFilename);
  }, [files.value, kohaBiblio.value, filename]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label>Upload your file here</label>
          <FileUpload {...files} />
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
            value={filename.value}
          />
        </div>
        <div>
          <button className="btn btn-blue">Upload</button>
        </div>
      </div>
    </div>
  );
};
