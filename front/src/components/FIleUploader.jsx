import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import STATUS_CODE from "../utils/statuses";
import { ImagesContext } from "./Contexts/ImagesContext";

import multiDownload from "multi-download";

const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  let [images, setImages] = useContext(ImagesContext).images;

  let arr = [];

  const selectFile = (event) => {
    let images = [];

    for (const [key, value] of Object.entries(event.target.files)) {
      images.push({
        file: value,
        resolution: "1280 x 720",
        status: STATUS_CODE.READY_FOR_UPLOAD,
      });
    }

    if (event.target.files.length === 0) return;
    setImages(images);
  };

  const resizeImages = () => {
    let interval = setInterval(() => {
      if (arr.length === images.length) {
        clearInterval(interval);
        multiDownload(arr);
        props.setDisabled(false);
      }
    }, 1000);

    props.setDisabled(true);
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
            let location = JSON.parse(result).data.Location;
            let key = JSON.parse(result).data.key;
            image.aws_key = key;
            image.resized_location = location.replace(key, "resized_" + key);
            const f = () => {
              fetch(
                `${process.env.REACT_APP_BACKEND_API}/status/resized_${key}`,
                {
                  method: "GET",
                }
              )
                .then((response) => {
                  return response.text();
                })
                .then((result) => {
                  if (JSON.parse(result).status == "success") {
                    arr.push(image.resized_location);
                    clearInterval(interval);
                  }
                });
            };
            let interval = setInterval(() => {
              f();
            }, 1000);
          })
          .catch((error) => console.log("error", error));
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
