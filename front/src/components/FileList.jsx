import { List, ListItem } from "@mui/material";
import { FilesContext } from "./Contexts/FilesContext";
import { useContext } from "react";
import ResolutionPicker from "./ResolutionPicker";

const FileList = (props) => {
  let [files, setFiles] = useContext(FilesContext);

  console.log(Array.from(files));

  if (Array.from(files).length === 0) return null;
  return (
    <List>
      {Array.from(files).map((file) => (
        <ListItem key={file.name}>
          <div className=""> {file.name}</div>{" "}
          <div>
            <ResolutionPicker></ResolutionPicker>
          </div>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
