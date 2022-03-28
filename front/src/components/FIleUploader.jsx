import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import STATUS_CODE from "../utils/statuses";
import { ImagesContext } from "./Contexts/ImagesContext";
import sendRequest from "../utils/try-requests";
import multiDownload from "multi-download";

const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  let [images, setImages] = useContext(ImagesContext).images;
  let [trigger, setTrigger] = useContext(ImagesContext).triggerAll;

  let arr = [];

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
    let interval = setInterval(() => {
      if (arr.length === images.length) {
        clearInterval(interval);
        console.log("GET THEM ALL");
        console.log(arr);
        //window.location.reload(true);
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
            console.log(JSON.parse(result));
            console.log(JSON.parse(result).data.Location);
            let location = JSON.parse(result).data.Location;
            let key = JSON.parse(result).data.key;
            image.aws_key = key;
            image.resized_location = location.replace(key, "resized_" + key);
            console.log(image);
            const f = () => {
              console.log(location);
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
                  console.log(result);
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
        //console.log(image);
        return image;
      })
    );
    // Promise.all(
    //   images.map((image) => {
    //     return fetch(
    //       `${process.env.REACT_APP_BACKEND_API}/status/${image.resized_location}`,
    //       {
    //         method: "GET",
    //       }
    //     );
    //   })
    //   // images.map((image) => {
    //   //   return sendRequest(image.resized_location);
    //   // })
    // )
    //   .then((results) => {
    //     console.log(results);
    //     console.log("ok");
    //     console.log(images);
    //     //TODO: Multi download
    //   })
    //   .catch((results) => console.error("not ok"));
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
