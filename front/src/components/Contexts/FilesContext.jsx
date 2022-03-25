import React, { useState } from "react";

export const FilesContext = React.createContext();

export const FilesProvider = (props) => {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <FilesContext.Provider value={[files, setFiles]}>
      {props.children}
    </FilesContext.Provider>
  );
};
