import "./globals.css";
import { LanguageProvider } from "../i18n/LanguageContext";
import { ProgressProvider } from "../i18n/ProgressContext";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "SPACE EXPLORER",
  description: "Explora el Sistema Solar de forma interactiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <ProgressProvider>
            <div
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SiteHeader />
              <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
              <SiteFooter />
            </div>
          </ProgressProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
