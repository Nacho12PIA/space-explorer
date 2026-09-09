"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getNovaContent } from "../../i18n/nova";
import { findNovaAnswer } from "../../data/novaEngine";
import styles from "./NovaPage.module.css";

export default function NovaPage() {
  const { language } = useLanguage();
  const content = getNovaContent(language);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const conversationEndRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isThinking]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  function sendMessage(rawText) {
    const text = rawText.trim();
    if (!text || isThinking) return;

    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: "user", text }]);
    setInput("");
    setIsThinking(true);

    const result = findNovaAnswer(text, language);
    const reply = result.found ? result.text : content.knowledgeFallback;

    timerRef.current = setTimeout(() => {
      setMessages((current) => [...current, { id: `${Date.now()}-nova`, role: "nova", text: reply }]);
      setIsThinking(false);
    }, 500);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Link href="/" className={styles.back}><span aria-hidden="true">←</span>{content.home}</Link>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}>{content.label}</div>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.subtitle}>{content.subtitle}</p>
          </div>
          <div className={styles.avatarWrap} aria-hidden="true">
            <div className={styles.avatarOrbit} /><div className={styles.avatarOrbit2} /><div className={styles.avatar}>✦</div>
          </div>
        </section>

        <section className={styles.console} aria-label={content.title}>
          <div className={styles.consoleHeader}>
            <div className={styles.status}><span className={styles.statusDot} /><span>{content.ready}</span></div>
            <div className={styles.consoleMark}>{content.consoleMark}</div>
          </div>
          <div className={styles.content}>
            {messages.length === 0 ? (
              <>
                <div className={styles.promptLabel}>{content.suggestedQuestions}</div>
                <div className={styles.suggestions}>
                  {content.suggestions.map((question) => (
                    <button className={styles.suggestion} type="button" key={question} onClick={() => sendMessage(question)} disabled={isThinking}>{question}</button>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.conversation} aria-live="polite">
                {messages.map((message) => (
                  <div className={`${styles.messageRow} ${message.role === "user" ? styles.userRow : styles.novaRow}`} key={message.id}>
                    {message.role === "nova" && <div className={styles.messageAvatar} aria-hidden="true">✦</div>}
                    <div className={`${styles.message} ${message.role === "user" ? styles.userMessage : styles.novaMessage}`}>
                      <div className={styles.messageLabel}>{message.role === "user" ? content.userLabel : content.novaLabel}</div>
                      <div style={{ whiteSpace: "pre-line" }}>{message.text}</div>
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className={`${styles.messageRow} ${styles.novaRow}`}>
                    <div className={styles.messageAvatar} aria-hidden="true">✦</div>
                    <div className={`${styles.message} ${styles.novaMessage} ${styles.thinking}`}>
                      <span>{content.thinking}</span><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
                    </div>
                  </div>
                )}
                <div ref={conversationEndRef} />
              </div>
            )}

            <form className={styles.composer} onSubmit={handleSubmit}>
              <textarea className={styles.input} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} placeholder={content.placeholder} rows={1} maxLength={600} aria-label={content.placeholder} disabled={isThinking} />
              <button className={styles.send} type="submit" disabled={!input.trim() || isThinking}>{content.send}</button>
            </form>
            <div className={styles.footerHint}><span aria-hidden="true">✦</span><span>{content.footerHint}</span></div>
          </div>
        </section>
      </div>
    </main>
  );
}
