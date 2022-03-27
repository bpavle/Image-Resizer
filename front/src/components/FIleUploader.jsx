import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { ImagesContext } from "./Contexts/ImagesContext";

const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  let [images, setImages] = useContext(ImagesContext);
  const selectFile = (event) => {
    //let files = [];

    let images = [];
    console.log({ ...event.target.files });

    for (const [key, value] of Object.entries(event.target.files)) {
      console.log(key);
      images.push({ file: value, resolution: "1280 x 720" });
    }
    console.log(images);
    // Array.from(event.target.files).forEach((file) => {
    //   files.push({ ...file, resolution: "medium" });
    // });
    if (event.target.files.length === 0) return;
    setImages(images);
  };

  const resizeImages = () => {
    //TODO: Create request to server
    console.log(images);
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
          Upload
        </Button>
        {images && images.length > 0 && (
          <Button variant="contained" onClick={resizeImages}>
            Resize
          </Button>
        )}
      </label>
    </>
  );
};
export default FileUploader;
