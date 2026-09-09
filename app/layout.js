import "./globals.css";
import { LanguageProvider } from "../i18n/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export const metadata = {
  title: "SPACE EXPLORER",
  description: "Explora el Sistema Solar de forma interactiva.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
