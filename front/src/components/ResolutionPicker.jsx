import { useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FilesContext } from "./Contexts/FilesContext";
export default function ResolutionPicker(props) {
  let [files, setFiles] = useContext(FilesContext);
  console.log(props.id);
  const setResolution = (event) => {
    files[props.id].resolution = event.target.value;
    setFiles(files);
    console.log(files);
  };
  return (
    <FormControl>
      <RadioGroup
        defaultValue={"medium"}
        row
        aria-labelledby="resolution-picker"
        name="row-radio-buttons-group"
        onChange={setResolution}
      >
        <FormControlLabel
          value="large"
          control={<Radio />}
          label="1920 x 1080"
        />
        <FormControlLabel
          value="medium"
          control={<Radio />}
          label="1280 x 720"
        />
        <FormControlLabel value="small" control={<Radio />} label="720 x 576" />
      </RadioGroup>
    </FormControl>
  );
}
