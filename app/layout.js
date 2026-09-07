import "./globals.css";

export const metadata = {
  title: "SPACE EXPLORER",
  description: "Explora el Sistema Solar de forma interactiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
