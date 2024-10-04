"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: 10,
        display: "flex",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
         maxWidth="xl"
      >
        <Typography variant="h1" gutterBottom>
          Proyecto - Etapa 1
        </Typography>
      </Container>
    </Box>
  );
}
