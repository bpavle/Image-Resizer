import { List, ListItem } from "@mui/material";
import { FilesContext } from "./Contexts/FilesContext";
import { useContext } from "react";

const FileList = (props) => {
  let [files, setFiles] = useContext(FilesContext);
  console.log(Array.from(files));
  if (Array.from(files).length === 0) return null;
  return (
    <List>
      {Array.from(files).map((file) => (
        <ListItem key={files.name}>{file.name}</ListItem>
      ))}
    </List>
  );
};
export default FileList;
