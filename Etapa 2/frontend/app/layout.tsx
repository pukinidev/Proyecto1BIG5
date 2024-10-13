import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CustomAppBar from "./components/navigation/CustomAppBar";
import theme from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import CustomFooter from "./components/navigation/CustomFooter";

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
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomAppBar />
            {children}
            <CustomFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
