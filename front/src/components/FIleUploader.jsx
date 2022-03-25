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
    setFiles(event.target.files);
  };

  return (
    <>
      <label htmlFor="contained-button-file">
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
      </label>
    </>
  );
};
export default FileUploader;
