import { Container } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: 10,
          paddingBottom: "3rem",
        }}
      >
        <section>{children}</section>
      </Container>
  );
}