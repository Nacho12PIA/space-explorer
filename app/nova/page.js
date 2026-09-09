"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";
import { getNovaContent } from "../../i18n/nova";

export default function NovaPage() {
  const { language } = useLanguage();
  const content = getNovaContent(language);

  return (
    <main
      style={{
        minHeight: "100%",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at 50% 0%, #2b1747 0%, #0b1024 38%, #02040a 100%)",
        color: "white",
        padding: "32px 20px 56px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            color: "white",
            textDecoration: "none",
            marginBottom: 34,
            fontSize: 13,
            fontWeight: 800,
            opacity: 0.8,
          }}
        >
          ← {content.home}
        </Link>

        <section style={{ textAlign: "center", padding: "18px 0 26px" }}>
          <div
            aria-hidden="true"
            style={{
              width: 76,
              height: 76,
              margin: "0 auto 20px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              fontSize: 38,
              background:
                "radial-gradient(circle at 35% 30%, #f5d0fe 0%, #c084fc 28%, #7c3aed 62%, #312e81 100%)",
              boxShadow: "0 0 46px rgba(192,132,252,0.38)",
              border: "1px solid rgba(255,255,255,0.24)",
            }}
          >
            ✦
          </div>

          <div
            style={{
              fontSize: 12,
              letterSpacing: 3,
              opacity: 0.58,
              fontWeight: 800,
            }}
          >
            {content.label}
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 10vw, 78px)",
              lineHeight: 1,
              margin: "9px 0 14px",
            }}
          >
            {content.title}
          </h1>

          <p
            style={{
              maxWidth: 600,
              margin: "0 auto",
              fontSize: "clamp(16px, 3.8vw, 19px)",
              lineHeight: 1.6,
              opacity: 0.76,
            }}
          >
            {content.subtitle}
          </p>
        </section>

        <section
          style={{
            marginTop: 22,
            padding: "22px",
            borderRadius: 24,
            background: "rgba(15,23,42,0.72)",
            border: "1px solid rgba(216,180,254,0.20)",
            boxShadow: "0 18px 55px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: 2,
              fontWeight: 800,
              opacity: 0.55,
              marginBottom: 14,
            }}
          >
            {content.suggestedQuestions}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 10,
            }}
          >
            {content.suggestions.map((question) => (
              <div
                key={question}
                style={{
                  padding: "14px 16px",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  lineHeight: 1.45,
                  fontSize: 14,
                  opacity: 0.84,
                }}
              >
                {question}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 18,
              padding: "7px 7px 7px 16px",
              borderRadius: 18,
              background: "rgba(2,6,23,0.72)",
              border: "1px solid rgba(216,180,254,0.20)",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                color: "rgba(255,255,255,0.42)",
                fontSize: 14,
              }}
            >
              {content.placeholder}
            </div>
            <button
              type="button"
              disabled
              style={{
                border: 0,
                borderRadius: 13,
                padding: "12px 15px",
                fontWeight: 900,
                fontSize: 11,
                letterSpacing: 0.6,
                color: "white",
                background: "rgba(139,92,246,0.55)",
                opacity: 0.65,
              }}
            >
              {content.send}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
