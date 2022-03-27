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
      {images.map((image, index) => {
        const imageObj = URL.createObjectURL(image.file);

        return (
          <ListItem key={image.file.name} className={styles.listItem}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
              }}
            >
              <img src={imageObj} className={styles.image} />

              <ListItemText>
                <Link href={imageObj} download>
                  {image.file.name}
                </Link>
              </ListItemText>
            </Box>
            <ResolutionPicker id={index}></ResolutionPicker>
            <ListItemSecondaryAction></ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};
export default FileList;
