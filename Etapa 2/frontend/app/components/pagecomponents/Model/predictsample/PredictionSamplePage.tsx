"use client";
import { Typography, Grid2, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import InsightsIcon from "@mui/icons-material/Insights";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import ModelModal from "./ModelModal";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ModelContainer from "../predictdata/ModelContainer";

export default function PredictSamplePage() {
  const [inputText, setInputText] = useState("");
  const [bodyData, setBodyData] = useState<SendDataInterface[] | null>(null);
  const [predictionData, setPredictionData] = useState<
    PredictionInterface[] | null
  >(null);
  const [formatFile, setFormatFile] = useState("xlsx");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangePhrase = () => {
    if (!inputText || inputText.trim() === "") {
      setError("Por favor introduzca por lo menos una frase");
      return;
    }

    const array_puki: SendDataInterface[] = [];
    const array1 = inputText.split("\n");

    for (let i = 0; i < array1.length; i++) {
      const phrase = array1[i].trim();
      if (phrase) {
        const dicc_puki: SendDataInterface = {
          Textos_espanol: phrase,
        };
        array_puki.push(dicc_puki);
      }
    }

    setBodyData(array_puki);
    setError("");
  };

  const handleSelectFormat = (event: SelectChangeEvent) => {
    setFormatFile(event.target.value as string);
  };

  const submitData = async () => {
    setLoading(true);
    try {
      const url = "https://fastapi-967824586620.us-central1.run.app/predict";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data: PredictionInterface[] = await response.json();
      setPredictionData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      setLoading(false);
    }
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
    setInputText("");
    setBodyData(null);
    setPredictionData(null);
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Predecir una muestra
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por favor introduzca las frases que desea predecir. Cada frase debe ir
        en una nueva línea.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Por ejemplo:
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Salud y bienestar <br />
        Colegios y educación <br />
        Igualdad y mujeres
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        {!bodyData && !predictionData && (
          <>
            <TextField
              label="Frases"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              multiline
              fullWidth
              rows={10}
              error={!!error}
              helperText={error}
            />

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ color: "white", marginTop: "1rem" }}
              onClick={handleChangePhrase}
            >
              Guardar Frases
            </Button>
          </>
        )}

        {bodyData && !predictionData && (
          <>
            <Typography
              variant="body1"
              sx={{
                marginTop: "1rem",
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
                Cantidad de frases a enviar:
              </span>{" "}
              {bodyData.length}
            </Typography>

            <Button
              variant="contained"
              startIcon={<InfoIcon />}
              sx={{ color: "white", marginBottom: "1rem" }}
              onClick={handleOpen}
            >
              Consultar frases
            </Button>

            <ModelModal open={open} handleClose={handleClose} data={bodyData} />
            
            <Button
              color="error"
              variant="contained"
              startIcon={<CleaningServicesIcon />}
              sx={{ color: "white", marginBottom: "1rem" }}
              onClick={cleanData}
            >
              Limpiar
            </Button>

            <Button
              variant="contained"
              startIcon={<InsightsIcon />}
              sx={{ color: "white", marginBottom: "1rem" }}
              onClick={submitData}
            >
              Predecir frases
            </Button>

            {loading && (
              <>
                <CircularProgress
                  sx={{ marginTop: "1rem", marginBottom: "1rem" }}
                  size="10rem"
                />
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
            
          </>
        )}
      </Grid2>
      {predictionData && (
        <>
          <ModelContainer data={predictionData} />

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
            sx={{ marginTop: "1rem", color: "white", marginBottom: "1rem" }}
          >
            Descargar
          </Button>

          <Stack spacing={2} direction="row">
            <Button
              color="error"
              variant="contained"
              startIcon={<CleaningServicesIcon />}
              sx={{ color: "white" }}
              onClick={cleanData}
            >
              Limpiar
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
