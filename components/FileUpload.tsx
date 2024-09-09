"use client";

import { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column" as FlexDirection,
  alignItems: "center",
  padding: "30px 10px 50px 10px",
  borderWidth: 2,
  borderRadius: 4,
  borderColor: "#aaaaaa",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#aaaaaa",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function FileUpload({
  addFiles,
  value,
  removeFiles,
}: {
  addFiles: (files: File[]) => void;
  value: File[];
  removeFiles: () => void;
}) {
  const [errors, setErrors] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(value);
  useEffect(() => {
    setSelectedFiles(value);
  }, [value]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "application/pdf": [".pdf"],
      },
      maxFiles: 1,
      maxSize: 10000000,
      onDrop: (acceptedFiles, fileRejections) => {
        addFiles(acceptedFiles);
        if (fileRejections.length === 0) {
          setErrors("");
        }
        fileRejections.forEach((file) => {
          file.errors.forEach(({ code }) => {
            if (code === "file-too-large") {
              setErrors(`Error: "${file.file.name}" is too large`);
            } else if (code === "file-invalid-type") {
              setErrors(`Error: "${file.file.name}" is not a PDF`);
            }
          });
        });
      },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div>
      <section>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag &amp; drop your files here, or click to select files</p>
          <em>(Only *.pdf; Maximum file size 10 MB)</em>
        </div>
      </section>
      <p className="text-red-700 font-semibold">{errors}</p>
      {value.length > 0 && (
        <div>
          <h4>Current Files:</h4>
          <ul>
            {value.map((file, i) => (
              <li key={`${i}-${file.name}`}>
                {file.name}{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFiles();
                  }}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
