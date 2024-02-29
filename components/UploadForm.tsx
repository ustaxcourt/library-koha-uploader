"use client";

import FileUpload from "@/components/FileUpload";
import { useFiles } from "@/hooks/useFiles";
import { useInput } from "@/hooks/useInput";
import { useEffect, useState } from "react";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";
import { Login } from "@microsoft/mgt-react";


export default function UploadForm() {
  const files = useFiles([]);
  const kohaBiblio = useInput();
  const filename = useInput();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const usersWhoCanLogin = [
    "michael.marcotte@ustaxcourt.gov",
    "allison.tyous@ustaxcourt.gov",
    "erin.fernandes@ustaxcourt.gov",
  ];

  const fixFilename = (fn: string) => {
    const [basename, extension] = fn.split(".");
    const newBasename = basename.replace(/-\d+$/, "");
    return [newBasename, extension].join(".");
  };

  const whatNow = () => {
    Providers.globalProvider.graph.client
      .api("me")
      .get()
      .then((gotMe) => {
        setUsername(gotMe.userPrincipalName);
        if (usersWhoCanLogin.includes(gotMe.userPrincipalName.toLowerCase())) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  };

  useEffect(() => {
    const uploadedFilename = files.value.length > 0 ? files.value[0].name : "";
    const fixedFilename = fixFilename(uploadedFilename);
    const newFilename = ["koha", kohaBiblio.value, fixedFilename].join("-");
    filename.setValue(newFilename);
  }, [files.value, kohaBiblio.value, filename]);
  return (
    <div>
      <Login loginCompleted={whatNow} />
      <div>
        {!!isLoggedIn ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label>Upload your file here</label>
              <FileUpload {...files} />
            </div>
            <div className="flex flex-col gap-2">
              <label>KOHA Biblio</label>
              <input
                className="text-slate-800 p-2"
                type="text"
                {...kohaBiblio}
              />
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
        ) : (
          <>
            <p>{username} is not allowed to use this application</p>
          </>
        )}
      </div>
    </div>
  );
}
