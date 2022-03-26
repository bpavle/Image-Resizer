import {
  Link,
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
      {Array.from(files).map((file, index) => (
        <ListItem key={file.name} className={styles.listItem}>
          <ListItemText>
            <Link href={URL.createObjectURL(file)} download>
              {file.name}
            </Link>
          </ListItemText>
          <ListItemSecondaryAction>
            <ResolutionPicker id={index}></ResolutionPicker>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
