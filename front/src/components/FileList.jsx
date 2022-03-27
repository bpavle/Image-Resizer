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
import ImageCard from "./ImageCard";

const FileList = (props) => {
  let [images, setImages] = useContext(ImagesContext);

  console.log(images);

  if (images === undefined || images.length === 0) return null;
  return (
    <div className={styles.container}>
      {images.map((image, index) => {
        const imageObj = URL.createObjectURL(image.file);

        return <ImageCard image={imageObj} id={index} />;
      })}
    </div>
  );
};
export default FileList;
