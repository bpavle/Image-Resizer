import { List, ListItem } from "@mui/material";
import { FilesContext } from "./Contexts/FilesContext";
import { useContext } from "react";
import ResolutionPicker from "./ResolutionPicker";
import styles from "./FileList.module.css";
const FileList = (props) => {
  let [files, setFiles] = useContext(FilesContext);

  console.log(Array.from(files));

  if (Array.from(files).length === 0) return null;
  return (
    <List>
      {Array.from(files).map((file) => (
        <ListItem key={file.name} className={styles.listItem}>
          <div className={styles.form}> {file.name}</div>{" "}
          <div>
            <ResolutionPicker></ResolutionPicker>
          </div>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
