"use client";

import { Box} from "@mui/material";
import Image from "next/image";
import banner from "../../../../../public/banner.png";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: 2,
        display: "flex",
      }}
    >
      <Image
        src={banner}
        alt="Logo"
        height={620}
        width={1920}
        style={{ marginBottom: "3rem" }}
      />
    </Box>
  );
}
