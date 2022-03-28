import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
  Link,
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
        {!trigger ? (
          <ResolutionPicker id={props.id} />
        ) : (
          <Link href={"resized_" + imageObj} download />
        )}
      </CardActions>
    </Card>
  );
};
export default ImageCard;
