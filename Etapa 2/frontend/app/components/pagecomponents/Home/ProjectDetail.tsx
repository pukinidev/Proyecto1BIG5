"use client";

import {
  Container,
  Grid2,
  Typography,
  ListItem,
  List,
  Card,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from 'next/link';


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
      <Typography
        variant="h3"
        color="primary"
        fontWeight="bold"
        sx={{ marginBottom: "1rem" }}
      >
        Objetivos
      </Typography>

      <List>
        <ListItem>
          ➡️ Automatizar un proceso replicable para aplicar la metodología de
          analítica de textos en la construcción de modelos analíticos.
        </ListItem>
        <ListItem>
          ➡️ Desarrollar una aplicación que utilice un modelo analítico basado
          en aprendizaje automático y sea de interés para una organización,
          empresa o institución y en particular para un rol existente en alguna
          de ellas.
        </ListItem>
      </List>

      <Typography
        variant="h3"
        color="primary"
        fontWeight="bold"
        sx={{
          paddingBottom: "1rem",
        }}
      >
        ODS
      </Typography>
      <Grid2
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <Image src="/ODS3.png" alt="ODS 3" height={300} width={300} />
        <Image src="/ODS4.png" alt="ODS 4" height={300} width={300} />
        <Image src="/ODS5.png" alt="ODS 5" height={300} width={300} />
      </Grid2>
      <Typography
        variant="h3"
        color="primary"
        fontWeight="bold"
        sx={{ marginBottom: "2rem" }}
      >
        Servicios
      </Typography>
      <Grid2
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "8rem",
          gap: 3,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            width: "300px",
            minHeight: "200px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            Reentrenar el modelo
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            El reentrenamiento de un modelo de clasificación de ODS (Objetivos
            de Desarrollo Sostenible)
          </Typography>
          <Link href="/retrainmodel" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", color: "white" }}
            >
              Probar
            </Button>
          </Link>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            width: "300px",
            minHeight: "200px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            Predecir un archivo
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            Predice las opiniones ciudadanas respecto a los ODS 3, 4 y 5
            utilizando un archivo CSV o XLSX.
          </Typography>
          <Link href="/prediction" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", color: "white" }}
            >
              Probar
            </Button>
          </Link>
        </Card>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            width: "300px",
            minHeight: "200px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold">
            Predecir textos
          </Typography>
          <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
            Predice las opiniones ciudadanas respecto a los ODS 3, 4 y 5 a
            partir de los textos ingresados por el usuario.
          </Typography>
          <Link href="/prediction" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", color: "white" }}
            >
              Probar
            </Button>
          </Link>
        </Card>
      </Grid2>
    </Container>
  );
}
