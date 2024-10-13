import { Box, Typography } from "@mui/material";

export default function CustomFooter() {
  return (
    <footer>
      <Box
        sx={{
          width: "100%",
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          borderTop: "1px solid #eaeaea",
        }}
      >
        <Typography variant="body2" color="textPrimary">
          © 2024 Grupo 5 Proyecto 1 - Etapa 2
        </Typography>
      </Box>
    </footer>
  );
}
