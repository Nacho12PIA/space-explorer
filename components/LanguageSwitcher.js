"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30000000,
        display: "flex",
        alignItems: "center",
        gap: 3,
        padding: 4,
        borderRadius: 999,
        background: "rgba(4, 10, 25, 0.78)",
        border: "1px solid rgba(255,255,255,0.16)",
        boxShadow: "0 8px 28px rgba(0,0,0,0.24)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <LanguageButton
        active={language === "es"}
        onClick={() => setLanguage("es")}
        label="ES"
        ariaLabel={t("common.language.switchToSpanish", "Cambiar a español")}
      />
      <LanguageButton
        active={language === "en"}
        onClick={() => setLanguage("en")}
        label="EN"
        ariaLabel={t("common.language.switchToEnglish", "Switch to English")}
      />
    </div>
  );
}

function LanguageButton({ active, onClick, label, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      style={{
        minWidth: 40,
        height: 34,
        padding: "0 10px",
        border: active ? "1px solid rgba(125,211,252,0.45)" : "1px solid transparent",
        borderRadius: 999,
        color: "white",
        background: active ? "rgba(37,99,235,0.78)" : "transparent",
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: 0.7,
        cursor: "pointer",
        opacity: active ? 1 : 0.66,
      }}
    >
      {label}
    </button>
  );
}
