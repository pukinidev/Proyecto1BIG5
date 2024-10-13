import { Card, CardContent, Typography } from "@mui/material";

import Image from "next/image";
import ModelGauge from "./ModelGauge";

export default function ModelDetail({ data }: ModelDetailsProps) {
  
  return (
    <Card
      sx={{
        marginTop: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{
            fontWeight: "bold",
            
          }}
        >
          Detalles de la predicción
        </Typography>
        <Typography variant="h6" color="primary" sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
        }}>
          Texto:
        </Typography>
        <Typography variant="body1" component="div">
          {data?.Texto}
        </Typography>
        <Typography variant="h6" color="primary" sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
        }}>
          Predicción:
        </Typography>
        <Image
          src={`/ODS` + data?.Prediccion + ".png"}
          alt="ODS 3"
          height={300}
          width={300}
          style={{ marginBottom: "1rem" }}
        />
        <Typography
          variant="h6"
          color="primary"
          sx={{
            marginBottom: "1rem",
          }}
        >
          Probabilidad:
        </Typography>
        <ModelGauge data={data} />
      </CardContent>
    </Card>
  );
}
