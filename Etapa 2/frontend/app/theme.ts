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
      main: '#ED8B00',
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
