import "./App.css";
import FileUploader from "./components/FIleUploader";
import { Typography } from "@mui/material";
import FileList from "./components/FileList";
import { FilesProvider } from "./components/Contexts/FilesContext";

function App() {
  return (
    <div className="App">
      <Typography variant="h2">Image Resizer</Typography>
      <FilesProvider>
        <FileList></FileList>
        <FileUploader />
      </FilesProvider>
    </div>
  );
}

export default App;
