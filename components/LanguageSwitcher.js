"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      style={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: 2,
        borderRadius: 999,
        background: "rgba(15, 23, 42, 0.88)",
        border: "1px solid rgba(255,255,255,0.16)",
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
        minWidth: 34,
        height: 26,
        padding: "0 7px",
        border: active ? "1px solid rgba(125,211,252,0.45)" : "1px solid transparent",
        borderRadius: 999,
        color: "white",
        background: active ? "rgba(37,99,235,0.82)" : "transparent",
        fontSize: 10,
        fontWeight: 900,
        letterSpacing: 0.6,
        cursor: "pointer",
        opacity: active ? 1 : 0.66,
      }}
    >
      {label}
    </button>
  );
}
