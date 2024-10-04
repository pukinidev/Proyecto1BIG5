'use client';
import { createTheme, PaletteColor, SimplePaletteColorOptions } from '@mui/material/styles';

declare module "@mui/material/styles" {
  interface Palette {
    header: PaletteColor;
  }

  interface PaletteOptions {
    header: SimplePaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3F5F90',
    },
    secondary: {
      main: '#555F71',
    },
    text: {
      primary: '#000000',
    },
    header: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },

});


export default theme;
