import "./App.css";
import FileUploader from "./components/FIleUploader";
import { Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Image Resizer</Typography>
      <FileUploader />
    </div>
  );
}

export default App;
