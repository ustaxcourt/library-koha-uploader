"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { MouseEventHandler, useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { startUpload } from "@/app/actions";
import { DocType } from "@/types/DocType";

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
  const [url, setUrl] = useState("");
  const [docType, setDocType] = useState<DocType>("JCT");

  const fixFilename = (fn: string) => {
    const [basename, extension] = fn.split(".");
    const newBasename = basename.replace(/-\d+$/, "");
    return [newBasename, extension].join(".");
  };

  const uploadFile = () => {
    initUpload(async () => {

      const url = await startUpload({ docType, filename, folderName: foldername });

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

  useEffect(() => {
    const docUrl = docType === "JCT" ?
      `${process.env.NEXT_PUBLIC_S3_JCT_URL_PREFIX}/${foldername}/${filename}`
      : `${process.env.NEXT_PUBLIC_S3_HEARINGS_URL_PREFIX}/${filename}`

    setUrl(
      docUrl
    );
  }, [filename, foldername]);

  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

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
          <label>Type</label>
          <div className="flex flex-row gap-2">
            <button className={`btn ${docType === "JCT" ? "btn-blue" : "btn-disabled"}`} onClick={() => setDocType("JCT")}>
              JCT
            </button>
            <button
              className={`btn ${docType === "Hearing" ? "btn-blue" : "btn-disabled"}`}
              onClick={() => setDocType("Hearing")}
            >
              Hearings
            </button>
          </div>
        </div>
        {docType === "JCT" && (
          <div className="flex flex-col gap-2">
            <label>Folder Name</label>
            <input
              className="text-slate-800 p-2 max-w-5xl w-full"
              type="text"
              value={foldername}
              disabled={isDisabled}
              readOnly
            />
          </div>
        )}
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
            <div className="flex flex-col space-y-5">
              <div
                className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <span className="font-medium">Upload complete!</span>
              </div>
              <div className="flex flex-col gap-2">
                <label>URL</label>
                <input
                  className={`text-slate-800 p-2 max-w-5xl w-full`}
                  type="text"
                  readOnly
                  value={url}
                />
                <div>
                  <button onClick={handleCopy} className="btn btn-blue">
                    {copied ? "copied!" : "copy"}
                  </button>
                </div>
              </div>
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
      className={`btn ${isDisabled
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
