"use client"

import { Box, Container, Typography } from '@mui/material'

export default function Hero() {
  return (
    <div>
    <Box
          sx={{
            width: "100%",
            paddingTop: 10,
            display: "flex",
            backgroundColor: "cyan",
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              
            }}
          >
            <Typography variant="h1" gutterBottom>
              Proyecto
            </Typography>
            <Typography variant="h2" gutterBottom>
              Etapa 2
            </Typography>
          </Container>
        </Box>
        </div>
  )
}
