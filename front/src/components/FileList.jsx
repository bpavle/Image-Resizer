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
import { ImagesContext } from "./Contexts/ImagesContext";
import { useContext } from "react";
import ResolutionPicker from "./ResolutionPicker";
import styles from "./FileList.module.css";
import { Box } from "@mui/system";
const FileList = (props) => {
  let [images, setImages] = useContext(ImagesContext);

  console.log(images);

  if (images === undefined || images.length === 0) return null;
  return (
    <List>
      {images.map((image, index) => (
        <ListItem key={image.file.name} className={styles.listItem}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
            }}
          >
            <img
              src={URL.createObjectURL(image.file)}
              className={styles.image}
            />

            <ListItemText>
              <Link href={URL.createObjectURL(image.file)} download>
                {image.file.name}
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
