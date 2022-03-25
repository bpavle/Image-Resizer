import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ResolutionPicker() {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="resolution-picker"
        name="row-radio-buttons-group"
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
