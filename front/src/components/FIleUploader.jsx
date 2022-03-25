import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
const Input = styled("input")({
  display: "none",
});
const FileUploader = (props) => {
  const selectFile = (event) => {
    console.log(event.target.files);
  };

  return (
    <>
      <div className="App">
        <Typography variant="h2">Image Resizer</Typography>
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
      </div>
    </>
  );
};
export default FileUploader;
