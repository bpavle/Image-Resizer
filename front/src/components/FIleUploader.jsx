import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import STATUS_CODE from "../utils/statuses";
import { ImagesContext } from "./Contexts/ImagesContext";

const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  let [images, setImages] = useContext(ImagesContext).images;
  let [trigger, setTrigger] = useContext(ImagesContext).triggerAll;

  const selectFile = (event) => {
    //let files = [];

    let images = [];
    //console.log({ ...event.target.files });

    for (const [key, value] of Object.entries(event.target.files)) {
      console.log(key);
      images.push({
        file: value,
        resolution: "1280 x 720",
        status: STATUS_CODE.READY_FOR_UPLOAD,
      });
    }
    //console.log(images);
    // Array.from(event.target.files).forEach((file) => {
    //   files.push({ ...file, resolution: "medium" });
    // });
    if (event.target.files.length === 0) return;
    setImages(images);
  };

  const resizeImages = () => {
    console.log("CLICKED UPLOAD");
    setTrigger(true);
    setImages(
      images.map((image) => {
        image.status = STATUS_CODE.UPLOADING;
        const formData = new FormData();
        formData.append("image", image.file);
        formData.append("size", image.resolution);
        const requestOptions = {
          method: "POST",
          body: formData,
          redirect: "follow",
        };

        fetch(
          `${process.env.REACT_APP_BACKEND_API}/upload-image`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => {
            //console.log(result);
            console.log(JSON.parse(result).data.key);
            image.aws_key = JSON.parse(result).data.key;
          })
          .catch((error) => console.log("error", error));
        //console.log(image);
        return image;
      })
    );
  };
  return (
    <>
      <label
        htmlFor="contained-button-file"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={selectFile}
        />
        <Button variant="contained" component="span">
          Pick Files
        </Button>
        {images && images.length > 0 && (
          <Button variant="contained" onClick={resizeImages}>
            Upload and Resize
          </Button>
        )}
      </label>
    </>
  );
};
export default FileUploader;
