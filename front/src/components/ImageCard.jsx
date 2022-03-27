import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import ResolutionPicker from "./ResolutionPicker";

const ImageCard = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="image"
        height="140"
        image={props.image}
        sx={{ minWidth: 200 }}
      />

      <CardActions>
        <ResolutionPicker id={props.id} />
        <Button size="small">DOWNLOAD</Button>
      </CardActions>
    </Card>
  );
};
export default ImageCard;
