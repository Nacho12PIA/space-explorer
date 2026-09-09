"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageContext";
import { getNovaContent } from "../../i18n/nova";
import styles from "./NovaPage.module.css";

export default function NovaPage() {
  const { language } = useLanguage();
  const content = getNovaContent(language);
  const isEnglish = language === "en";

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}>
          <span aria-hidden="true">←</span>
          {content.home}
        </Link>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>{content.label}</div>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.subtitle}>{content.subtitle}</p>
          </div>

          <div className={styles.avatarWrap} aria-hidden="true">
            <div className={styles.avatarOrbit} />
            <div className={styles.avatarOrbit2} />
            <div className={styles.avatar}>✦</div>
          </div>
        </section>

        <section className={styles.console} aria-label={content.title}>
          <div className={styles.consoleHeader}>
            <div className={styles.status}>
              <span className={styles.statusDot} />
              <span>{isEnglish ? "SPACE LINK READY" : "ENLACE ESPACIAL LISTO"}</span>
            </div>
            <div className={styles.consoleMark}>NOVA · AI</div>
          </div>

          <div className={styles.content}>
            <div className={styles.promptLabel}>{content.suggestedQuestions}</div>

            <div className={styles.suggestions}>
              {content.suggestions.map((question) => (
                <div className={styles.suggestion} key={question}>
                  {question}
                </div>
              ))}
            </div>

            <div className={styles.composer}>
              <div className={styles.placeholder}>{content.placeholder}</div>
              <button className={styles.send} type="button" disabled>
                {content.send}
              </button>
            </div>

            <div className={styles.footerHint}>
              <span aria-hidden="true">✦</span>
              <span>
                {isEnglish
                  ? "NOVA will help you investigate, understand, and keep exploring."
                  : "NOVA te ayudará a investigar, comprender y seguir explorando."}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
