"use client";
import {
  Grid2,
  IconButton,
  MenuItem,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ModelContainer from "./ModelContainer";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import CircularProgress from "@mui/material/CircularProgress";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function PredictDataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [predictionData, setPredictionData] = useState<
    PredictionInterface[] | null
  >(null);
  const [formatFile, setFormatFile] = useState("xlsx");
  const [checkFile, setCheckFile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const recievedFile = event.target.files;
    setFile(recievedFile ? recievedFile[0] : null);
    setCheckFile(recievedFile ? recievedFile[0].name : "");
  };

  const handleFileSubmit = async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      setLoading(true);
      try {
        const url =
          "https://fastapi-967824586620.us-central1.run.app/predict_from_excel";
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const data: PredictionInterface[] = await response.json();
        setLoading(false);
        setPredictionData(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No file selected");
    }
  };

  const handleSelectFormat = (event: SelectChangeEvent) => {
    setFormatFile(event.target.value as string);
  };

  const downloadPrediction = async () => {
    if (predictionData) {
      const url =
        "https://fastapi-967824586620.us-central1.run.app/download-file/?format=" +
        formatFile;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(predictionData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.blob();
      const urlBlob = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = urlBlob;
      a.download = `prediction.${formatFile}`;
      a.click();
    }
  };

  const cleanData = () => {
    setPredictionData(null);
    setCheckFile("");
    setFile(null);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Predecir un conjunto de datos
      </Typography>
      <Grid2
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {file === null && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUpload />}
            sx={{
              color: "white",
              marginBottom: "1rem",
              marginRight: "1rem",
            }}
          >
            Suba un archivo
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        )}

        {checkFile && (
          <>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "1rem",
                fontWeight: "bold",
                padding: "0.5rem",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                border: "1px solid #ddd",
                display: "inline-block",
                marginRight: "0.5rem",
              }}
            >
              <span style={{ fontSize: "1rem", color: "#ED8B00" }}>
                Archivo seleccionado:
              </span>{" "}
              {checkFile}
            </Typography>
            <IconButton
              onClick={cleanData}
              sx={{
                color: "#ED8B00",
                alignContent: "center",
                marginBottom: "1rem",
              }}
            >
              <CleaningServicesIcon />
            </IconButton>
          </>
        )}
      </Grid2>

      {file && (
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {predictionData === null && (
            <Button
              onClick={handleFileSubmit}
              variant="contained"
              sx={{
                color: "white",
                marginBottom: "1rem",
              }}
            >
              Predecir
            </Button>
          )}

          {loading && (
            <>
              <CircularProgress sx={{ marginTop: "1rem",marginBottom: "1rem" }} size="10rem" />
              <Typography
                variant="body1"
                sx={{
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  padding: "0.5rem",
                  display: "inline-block",
                  marginRight: "0.5rem",
                }}
              >
                Se esta realizando la predicción...
              </Typography>
            </>
          )}
        </Grid2>
      )}

      {predictionData !== null && (
        <>
          {" "}
          <ModelContainer data={predictionData} />{" "}
          <Typography
            variant="body1"
            color="primary"
            fontWeight="bold"
            sx={{ marginTop: "1rem" }}
          >
            Seleccione el formato de descarga
          </Typography>
          <Select
            value={formatFile}
            onChange={handleSelectFormat}
            sx={{
              marginTop: "1rem",
              marginBottom: "1rem",
              marginRight: "1rem",
            }}
          >
            <MenuItem value="xlsx">XLSX</MenuItem>
            <MenuItem value="csv">CSV</MenuItem>
          </Select>
          <Button
            onClick={downloadPrediction}
            variant="contained"
            sx={{
              marginTop: "1rem",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Descargar
          </Button>
        </>
      )}
    </>
  );
}
