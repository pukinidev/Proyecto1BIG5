"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link"; 
import { useState } from "react";

const pages = [
  { href: "/retrainmodel", label: "Reentrenar el modelo" },
  { href: "/prediction", label: "Predicción" },
];

export default function CustomAppBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            href="/"
            color="primary"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Proyecto 1 - Etapa 2
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ href, label }) => (
                <MenuItem key={href} onClick={handleCloseNavMenu}>
                  <Link
                    href={href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            color="primary"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Proyecto 1 - Etapa 2
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ href, label }) => (
              <Button
                key={href}
                onClick={handleCloseNavMenu}
                color="inherit"
                sx={{ my: 2, display: "block" }}
              >
                <Link
                  href={href}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {label}
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
