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
      }}
    >
      <Typography variant="h2">Image Resizer</Typography>
      <ImagesProvider>
        <FileList></FileList>
        <FileUploader />
      </ImagesProvider>
    </Container>
  );
}

export default App;
