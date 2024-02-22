import { useState } from "react";

export const useFiles = (initialValue: File[]) => {
  const [value, setValue] = useState(initialValue);

  const addFiles = (newFiles: File[]) => {
    setValue(newFiles);
  };

  const removeFiles = () => {
    setValue([]);
  };

  return {
    value,
    addFiles,
    removeFiles,
  };
};
