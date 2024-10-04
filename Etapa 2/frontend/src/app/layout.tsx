import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./components/navigation/CustomAppBar";
import theme from "./theme";


const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ResponsiveAppBar />
          <ThemeProvider theme={theme}>
            
              {children}
            
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
