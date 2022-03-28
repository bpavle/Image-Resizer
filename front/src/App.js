import "./App.css";
import FileUploader from "./components/FIleUploader";
import {
  Typography,
  Paper,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import FileList from "./components/FileList";
import { ImagesProvider } from "./components/Contexts/ImagesContext";
import { useState } from "react";

function App() {
  let [disabled, setDisabled] = useState(false);
  if (disabled)
    return (
      <Backdrop sx={{ color: "#fff", zIndex: 100 }} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
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
        <FileUploader setDisabled={setDisabled} />
      </ImagesProvider>
    </Container>
  );
}

export default App;
