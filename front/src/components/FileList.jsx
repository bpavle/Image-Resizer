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
  let [images, setImages] = useContext(ImagesContext).images;

  if (images === undefined || images.length === 0) return null;
  return (
    <div className={styles.container}>
      {images.map((image, index) => {
        return <ImageCard image={image} id={index} key={index} />;
      })}
    </div>
  );
};
export default FileList;
