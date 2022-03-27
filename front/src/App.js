import "./App.css";
import FileUploader from "./components/FIleUploader";
import { Typography, Paper, Container } from "@mui/material";
import FileList from "./components/FileList";
import { FilesProvider } from "./components/Contexts/FilesContext";

function App() {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center" }}>
      <Typography variant="h2">Image Resizer</Typography>
      <FilesProvider>
        <FileList></FileList>
        <FileUploader />
      </FilesProvider>
    </Container>
  );
}

export default App;
