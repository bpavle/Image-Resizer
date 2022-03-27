import "./App.css";
import FileUploader from "./components/FIleUploader";
import { Typography, Paper, Container } from "@mui/material";
import FileList from "./components/FileList";
import { ImagesProvider } from "./components/Contexts/ImagesContext";

function App() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginTop: "10%",
        marginBottom: "3%",
        gap: "10px",
      }}
    >
      <Typography variant="h2">Image Resizer</Typography>

      <Typography variant="body1">
        Choose your files, adjust resoluton, click <b>upload and resize</b>
      </Typography>
      <ImagesProvider>
        <FileList></FileList>
        <FileUploader />
      </ImagesProvider>
    </Container>
  );
}

export default App;
