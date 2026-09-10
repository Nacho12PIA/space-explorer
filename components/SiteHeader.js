"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../i18n/LanguageContext";

export default function SiteHeader() {
  const { language } = useLanguage();
  const progressLabel = language === "en" ? "PROGRESS" : "PROGRESO";

  return (
    <header
      style={{
        position: "relative",
        zIndex: 1000000,
        width: "100%",
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "6px 14px",
        background: "rgba(2, 4, 10, 0.94)",
        borderBottom: "1px solid rgba(255,255,255,0.10)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          minWidth: 0,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Link
          href="/"
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1.2,
            whiteSpace: "nowrap",
            textDecoration: "none",
          }}
        >
          SPACE EXPLORER
        </Link>

        <div
          aria-hidden="true"
          style={{
            width: 1,
            height: 18,
            background: "rgba(255,255,255,0.12)",
          }}
        />

        <Link
          href="/progreso"
          aria-label={progressLabel}
          style={{
            minHeight: 28,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 8px",
            borderRadius: 999,
            color: "rgba(255,255,255,0.82)",
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.18)",
            textDecoration: "none",
            fontSize: 9,
            fontWeight: 900,
            letterSpacing: .6,
            whiteSpace: "nowrap",
          }}
        >
          <span aria-hidden="true">🏅</span>
          <span>{progressLabel}</span>
        </Link>
      </div>

      <LanguageSwitcher />
    </header>
  );
}
