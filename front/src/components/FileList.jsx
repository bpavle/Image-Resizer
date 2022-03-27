import {
  Avatar,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { FilesContext } from "./Contexts/FilesContext";
import { useContext } from "react";
import ResolutionPicker from "./ResolutionPicker";
import styles from "./FileList.module.css";
import { Box } from "@mui/system";
const FileList = (props) => {
  let [files, setFiles] = useContext(FilesContext);

  console.log(files);

  if (files === undefined || Array.from(files).length === 0) return null;
  return (
    <List>
      {Array.from(files).map((file, index) => (
        <ListItem key={file.name} className={styles.listItem}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <img src={URL.createObjectURL(file)} className={styles.image} />

            <ListItemText>
              <Link href={URL.createObjectURL(file)} download>
                {file.name}
              </Link>
            </ListItemText>
          </Box>
          <ResolutionPicker id={index}></ResolutionPicker>
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
export default FileList;
