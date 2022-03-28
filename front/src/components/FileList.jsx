import { ImagesContext } from "./Contexts/ImagesContext";
import { useContext } from "react";
import styles from "./FileList.module.css";
import ImageCard from "./ImageCard";

const FileList = (props) => {
  let [images] = useContext(ImagesContext).images;

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
