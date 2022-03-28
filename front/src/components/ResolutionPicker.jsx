import { useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ImagesContext } from "./Contexts/ImagesContext";
export default function ResolutionPicker(props) {
  let [images, setImages] = useContext(ImagesContext).images;
  const setResolution = (event) => {
    images[props.id].resolution = event.target.value;
    setImages(images);
    console.log(images);
  };
  return (
    <FormControl>
      <RadioGroup
        defaultValue={"1280 x 720"}
        row
        aria-label="resolution-picker"
        name="row-radio-buttons-group"
        onChange={setResolution}
      >
        <FormControlLabel
          value="1920 x 1080"
          control={<Radio />}
          label="1920 x 1080"
        />
        <FormControlLabel
          value="1280 x 720"
          control={<Radio />}
          label="1280 x 720"
        />
        <FormControlLabel
          value="720 x 576"
          control={<Radio />}
          label="720 x 576"
        />
      </RadioGroup>
    </FormControl>
  );
}
