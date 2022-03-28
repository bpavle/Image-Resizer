import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import ResolutionPicker from "./ResolutionPicker";
import { useState, useEffect, useContext } from "react";
import { ImagesContext } from "./Contexts/ImagesContext";
import STATUS_CODE from "../utils/statuses";

let interval;
const ImageCard = (props) => {
  const [trigger] = useContext(ImagesContext).triggerAll;
  const [images, setImages] = useContext(ImagesContext).images;
  const [imageStatus, setImageStatus] = useState(STATUS_CODE.READY_FOR_UPLOAD);
  const imageObj = URL.createObjectURL(props.image.file);

  const checkStatus = (aws_key) => {
    if (trigger && imageStatus !== STATUS_CODE.UPLOADING) {
      setImageStatus(STATUS_CODE.UPLOADING);
    }
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    console.log(`Image ${props.id}:imageStatus: ${imageStatus}`);
    console.log(`Image ${props.id}: Trigger: ${trigger}`);
    fetch(
      `${process.env.REACT_APP_BACKEND_API}/status/${aws_key}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        if (JSON.parse(result).status === "success") {
          console.log(
            `Image ${props.id}: Setting image status to ready for download`
          );
          setImageStatus(STATUS_CODE.READY_FOR_DOWNLOAD);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // useEffect(() => {
  //   interval = setInterval(() => {
  //     checkStatus(props.image.aws_key);
  //   }, 1000);
  //   console.log(`Image ${props.id}: Setting interval once`);
  //   return () => {
  //     console.log(`Image ${props.id}: CLEAR FROM USEEFFECT ${interval}`);
  //     return clearInterval(interval);
  //   };
  // }, [trigger]);

  console.log(`Image ${props.id}: Rendered ImageCard component`);
  console.log(`Image ${props.id}: Image Status: ${imageStatus}`);
  if (imageStatus === STATUS_CODE.READY_FOR_DOWNLOAD) {
    console.log(`Image ${props.id}: CLEARING INTERVAL ${interval}`);
    clearInterval(interval);
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={imageObj}
        sx={{ minWidth: 200 }}
      />

      <CardActions>
        {imageStatus !== STATUS_CODE.UPLOADING ? (
          <ResolutionPicker id={props.id} />
        ) : (
          <CircularProgress />
        )}
      </CardActions>
    </Card>
  );
};
export default ImageCard;
