'use client'

import { Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";


export default function ProjectDetail() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h2"
        sx={{ marginBottom: "1rem" }}
        color="primary"
        fontWeight="bold"
      >
        Proyecto 1 - Etapa 2
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        El problema que el Fondo de Poblaciones de las Naciones Unidas (UNFPA)
        quiere resolver es la identificación de problemas y evaluación de
        soluciones relacionadas con los objetivos de Desarrollo Sostenible (ODS)
        basadas en las opiniones y necesidades que expresan los ciudadanos. Esto
        requiere el análisis de grandes cantidades de información textual,
        acompañado del concepto de expertos. Dado este problema se presenta una
        oportunidad para implementar un modelo analítico de clasificación de
        opiniones ciudadanas respecto a los ODS 3 (Salud y bienestar), 4
        (Educación de Calidad) y 5 (Igualdad de género) ​ (United Nations,
        2023)​. El propósito es permitir un análisis más eficiente y económico
        de las opiniones ciudadanas para encontrar insights que permitan la toma
        de decisiones y el diseño de políticas públicas.
      </Typography>
      <Typography variant="h3" color="primary" fontWeight="bold">
          ODS 
      </Typography>
      <Grid2 container sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}>
        <Image src="/ODS3.png" alt="ODS 3" height={300} width={300} />
        <Image src="/ODS4.png"  alt="ODS 4" height={300} width={300} />
        <Image src="/ODS5.png" alt="ODS 5" height={300} width={300} />
      </Grid2>
    </Container>
  );
}
