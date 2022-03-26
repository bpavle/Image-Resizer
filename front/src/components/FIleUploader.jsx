import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { FilesContext } from "./Contexts/FilesContext";

const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  let [files, setFiles] = useContext(FilesContext);
  const selectFile = (event) => {
    console.log(event.target.files);
    if (event.target.files.length === 0) return;
    setFiles(event.target.files);
  };

  const resizeImages = () => {
    //TODO: Create request to server
    console.log(files);
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
        {files && files.length > 0 && (
          <Button variant="contained" onClick={resizeImages}>
            Resize
          </Button>
        )}
      </label>
    </>
  );
};
export default FileUploader;
