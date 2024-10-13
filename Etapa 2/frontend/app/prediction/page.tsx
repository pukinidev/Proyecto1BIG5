"use client";

import { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import PredictDataPage from "../components/pagecomponents/Model/predictdata/PredictionDataPage";
import PredictSamplePage from "../components/pagecomponents/Model/predictsample/PredictionSamplePage";
import { Button, Typography, Card, CardContent } from "@mui/material";

export default function Prediction() {
  const [selectedMode, setSelectedMode] = useState("");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "800px",
          margin: "auto",
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", mb: 3 }}
        >
          Selecciona el modo de predicción
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              width: { xs: "100%", md: "45%" },
              boxShadow:
                selectedMode === "archivo"
                  ? "0px 0px 6px rgba(237, 139, 0, 0.8)"
                  : "none",
              transition: "box-shadow 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onClick={() => setSelectedMode("archivo")}
          >
            <CardContent>
              <FormControlLabel
                value="archivo"
                control={<Radio checked={selectedMode === "archivo"} />}
                label="Predecir con un archivo CSV/XLSX"
              />
              <Typography variant="body2" color="textSecondary">
                Sube un archivo CSV o XLSX con los datos estructurados para
                realizar predicciones masivas.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: { xs: "100%", md: "45%" },
              boxShadow:
                selectedMode === "texto"
                  ? "0px 0px 6px rgba(237, 139, 0, 0.8)"
                  : "none",
              transition: "box-shadow 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onClick={() => setSelectedMode("texto")}
          >
            <CardContent>
              <FormControlLabel
                value="texto"
                control={<Radio checked={selectedMode === "texto"} />}
                label="Predecir escribiendo las opiniones"
              />
              <Typography variant="body2" color="textSecondary">
                Escribe manualmente las opiniones o textos individuales para
                obtener predicciones rápidas.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedMode === ""}
          sx={{ marginTop: 3, color: "white" }}
          onClick={() => setSelectedMode("")}
        >
          Limpiar selección
        </Button>
      </Box>

      {selectedMode === "archivo" && (
        <Box sx={{ marginTop: 4 }}>
          <PredictDataPage />
        </Box>
      )}
      {selectedMode === "texto" && (
        <Box sx={{ marginTop: 4 }}>
          <PredictSamplePage />
        </Box>
      )}
    </>
  );
}
