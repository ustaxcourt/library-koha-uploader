"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { MouseEventHandler, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { startUpload } from "@/app/actions";
export default function Component() {
  const { data: session } = useSession();

  const usersWhoCanLogin = [
    "michael.marcotte@ustaxcourt.gov",
    "allison.tyous@ustaxcourt.gov",
    "erin.fernandes@ustaxcourt.gov",
  ];

  return (
    <div>
      {session?.user?.email &&
      usersWhoCanLogin.includes(session.user.email.toLowerCase()) ? (
        <div>
          <UploadForm />
        </div>
      ) : session?.user?.email ? (
        <div>This user does not have access to this application</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

const UploadForm = () => {
  const kohaNumber = useInput();
  const [foldername, setFoldername] = useState("");
  const [uploadStarted, initUpload] = useTransition();
  const files = useFiles([]);
  const [filename, setFilename] = useState("");
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const fixFilename = (fn: string) => {
    const [basename, extension] = fn.split(".");
    const newBasename = basename.replace(/-\d+$/, "");
    return [newBasename, extension].join(".");
  };

  const uploadFile = () => {
    console.log("upload file clicked");
    initUpload(async () => {
      const url = await startUpload({ filename: `${foldername}/${filename}` });

      await fetch(url, {
        method: "PUT",
        mode: "cors",
        body: files.value[0],
      });

      setIsUploadComplete(true);
    });
  };

  useEffect(() => {
    if (files.value.length === 0 || !kohaNumber.value) {
      setDisabled(true);
      return;
    }

    setDisabled(false);

    const uploadedFilename = files.value.length > 0 ? files.value[0].name : "";
    const fixedFilename = fixFilename(uploadedFilename);
    const newFilename = ["koha", kohaNumber.value, fixedFilename].join("-");
    setFilename(newFilename);
    setFoldername(newFilename.split(".")[0]);
  }, [files.value, kohaNumber.value]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label>Upload your file here</label>
          <FileUpload {...files} />
        </div>
        <div className="flex flex-col gap-2">
          <label>KOHA Number</label>
          <input className="text-slate-800 p-2" type="text" {...kohaNumber} />
        </div>
        <div className="flex flex-col gap-2">
          <label>Folder Name</label>
          <input
            className="text-slate-800 p-2 max-w-5xl w-full"
            type="text"
            value={foldername}
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Filename</label>
          <input
            className={`text-slate-800 p-2 max-w-5xl w-full`}
            type="text"
            readOnly
            disabled={isDisabled}
            value={filename}
          />
        </div>
        <div>
          {isUploadComplete ? (
            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span className="font-medium">Upload complete!</span>
            </div>
          ) : (
            <Upload
              isDisabled={uploadStarted || isDisabled}
              onClick={uploadFile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Upload = ({
  isDisabled,
  onClick,
}: {
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={`btn ${
        isDisabled
          ? "btn-disabled cursor-not-allowed"
          : "btn-blue cursor-pointer"
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      Upload
    </button>
  );
};
