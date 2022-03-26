import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FilesContext } from "./Contexts/FilesContext";
import { useContext } from "react";
import ResolutionPicker from "./ResolutionPicker";
import styles from "./FileList.module.css";
const FileList = (props) => {
  let [files, setFiles] = useContext(FilesContext);

  console.log(files);

  if (files === undefined || Array.from(files).length === 0) return null;
  return (
    <List>
      {Array.from(files).map((file) => (
        <ListItem key={file.name} className={styles.listItem}>
          <ListItemText> {file.name}</ListItemText>{" "}
          <ListItemSecondaryAction>
            <ResolutionPicker></ResolutionPicker>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
