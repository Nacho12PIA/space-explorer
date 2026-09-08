"use client";

import { useState } from "react";

const questions = [
  {
    question:
      "La sonda se acerca al planeta más caliente del Sistema Solar. ¿Cuál es?",
    options: [
      "Mercurio",
      "Venus",
      "Marte",
    ],
    correct: 1,
    explanation:
      "¡Correcto! Venus es el planeta más caliente debido a su densa atmósfera y su intenso efecto invernadero.",
  },
  {
    question:
      "Necesitamos localizar el planeta más grande del Sistema Solar. ¿Cuál es?",
    options: [
      "Saturno",
      "Júpiter",
      "Neptuno",
    ],
    correct: 1,
    explanation:
      "¡Exacto! Júpiter es el planeta más grande del Sistema Solar.",
  },
  {
    question:
      "La sonda detecta un planeta que gira prácticamente tumbado. ¿Cuál es?",
    options: [
      "Urano",
      "Marte",
      "Saturno",
    ],
    correct: 0,
    explanation:
      "¡Bien! Urano tiene una inclinación extrema y parece girar tumbado sobre uno de sus lados.",
  },
  {
    question:
      "Para identificar la Tierra, buscamos un planeta cuya superficie esté cubierta aproximadamente en un 71% por...",
    options: [
      "Hielo",
      "Agua",
      "Desiertos",
    ],
    correct: 1,
    explanation:
      "¡Correcto! Aproximadamente el 71% de la superficie terrestre está cubierta por agua.",
  },
  {
    question:
      "Último desafío. ¿Qué tipo de astro es el Sol?",
    options: [
      "Un planeta",
      "Una estrella",
      "Una luna",
    ],
    correct: 1,
    explanation:
      "¡Misión cumplida! El Sol es una estrella y contiene la mayor parte de la masa del Sistema Solar.",
  },
];

export default function MissionPlayer() {
  const [started, setStarted] =
    useState(false);

  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState(null);

  const [answered, setAnswered] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const question =
    questions[current];

  function startMission() {
    setStarted(true);
  }

  function answerQuestion(index) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === question.correct) {
      setScore((previous) =>
        previous + 1
      );
    }
  }

  function nextQuestion() {
    if (
      current ===
      questions.length - 1
    ) {
      setFinished(true);
      return;
    }

    setCurrent((previous) =>
      previous + 1
    );

    setSelected(null);
    setAnswered(false);
  }

  function restartMission() {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setFinished(false);
  }

  if (!started) {
    return (
      <section
        style={{
          marginTop: 36,
          padding: 24,
          borderRadius: 22,
          background:
            "linear-gradient(145deg, rgba(37,99,235,0.24), rgba(15,23,42,0.88))",
          border:
            "1px solid rgba(96,165,250,0.35)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.5,
            fontWeight: 800,
            opacity: 0.65,
          }}
        >
          MISIÓN 01
        </div>

        <h2
          style={{
            fontSize: 28,
            margin: "8px 0 10px",
          }}
        >
          🚀 Rescate en el Sistema Solar
        </h2>

        <p
          style={{
            maxWidth: 620,
            lineHeight: 1.6,
            opacity: 0.75,
          }}
        >
          Una sonda ha perdido sus datos
          de navegación. Recupera la ruta
          resolviendo cinco desafíos sobre
          el Sistema Solar.
        </p>

        <button
          onClick={startMission}
          style={{
            marginTop: 20,
            border: 0,
            borderRadius: 999,
            padding: "13px 20px",
            cursor: "pointer",
            fontWeight: 900,
            fontSize: 13,
          }}
        >
          INICIAR MISIÓN →
        </button>
      </section>
    );
  }

  if (finished) {
    return (
      <section
        style={{
          marginTop: 36,
          padding: 28,
          borderRadius: 22,
          textAlign: "center",
          background:
            "rgba(15,23,42,0.82)",
          border:
            "1px solid rgba(255,255,255,0.14)",
        }}
      >
        <div
          style={{
            fontSize: 48,
          }}
        >
          {score >= 4
            ? "🏆"
            : score >= 3
              ? "🚀"
              : "🛰️"}
        </div>

        <h2
          style={{
            fontSize: 30,
            marginBottom: 8,
          }}
        >
          MISIÓN COMPLETADA
        </h2>

        <p
          style={{
            fontSize: 18,
            opacity: 0.8,
          }}
        >
          Has recuperado{" "}
          <strong>
            {score} de{" "}
            {questions.length}
          </strong>{" "}
          datos de navegación.
        </p>

        <p
          style={{
            maxWidth: 520,
            margin:
              "20px auto 0",
            lineHeight: 1.6,
            opacity: 0.72,
          }}
        >
          {score === 5
            ? "¡Excelente! La sonda vuelve a tener toda la información necesaria para continuar su viaje."
            : score >= 3
              ? "Buen trabajo. La sonda puede continuar, aunque todavía quedan algunos datos por mejorar."
              : "La sonda necesita un poco más de ayuda. Explora de nuevo el Sistema Solar y vuelve a intentarlo."}
        </p>

        <button
          onClick={restartMission}
          style={{
            marginTop: 28,
            border: 0,
            borderRadius: 999,
            padding: "13px 20px",
            cursor: "pointer",
            fontWeight: 900,
            fontSize: 13,
          }}
        >
          REPETIR MISIÓN
        </button>
      </section>
    );
  }

  const progress =
    ((current + 1) /
      questions.length) *
    100;

  return (
    <section
      style={{
        marginTop: 36,
        padding: 24,
        borderRadius: 22,
        background:
          "rgba(15,23,42,0.82)",
        border:
          "1px solid rgba(255,255,255,0.14)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          gap: 12,
          marginBottom: 12,
          fontSize: 12,
          fontWeight: 800,
          opacity: 0.65,
        }}
      >
        <span>
          DESAFÍO {current + 1}
        </span>

        <span>
          {current + 1} /{" "}
          {questions.length}
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: 7,
          borderRadius: 999,
          overflow: "hidden",
          background:
            "rgba(255,255,255,0.10)",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background:
              "rgba(96,165,250,0.9)",
            transition:
              "width 0.3s ease",
          }}
        />
      </div>

      <h2
        style={{
          fontSize:
            "clamp(22px, 5vw, 30px)",
          lineHeight: 1.3,
          marginBottom: 24,
        }}
      >
        {question.question}
      </h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {question.options.map(
          (option, index) => {
            const isCorrect =
              index ===
              question.correct;

            const isSelected =
              index === selected;

            let background =
              "rgba(255,255,255,0.06)";

            let border =
              "1px solid rgba(255,255,255,0.12)";

            if (
              answered &&
              isCorrect
            ) {
              background =
                "rgba(34,197,94,0.18)";
              border =
                "1px solid rgba(74,222,128,0.55)";
            }

            if (
              answered &&
              isSelected &&
              !isCorrect
            ) {
              background =
                "rgba(239,68,68,0.18)";
              border =
                "1px solid rgba(248,113,113,0.55)";
            }

            return (
              <button
                key={option}
                onClick={() =>
                  answerQuestion(
                    index
                  )
                }
                disabled={answered}
                style={{
                  width: "100%",
                  padding:
                    "16px 18px",
                  textAlign: "left",
                  borderRadius: 14,
                  border,
                  background,
                  color: "white",
                  cursor: answered
                    ? "default"
                    : "pointer",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {option}
              </button>
            );
          }
        )}
      </div>

      {answered && (
        <div
          style={{
            marginTop: 24,
            padding: 18,
            borderRadius: 16,
            background:
              selected ===
              question.correct
                ? "rgba(34,197,94,0.12)"
                : "rgba(239,68,68,0.12)",
          }}
        >
          <strong>
            {selected ===
            question.correct
              ? "✓ RESPUESTA CORRECTA"
              : "✕ CASI"}
          </strong>

          <p
            style={{
              margin:
                "8px 0 0",
              lineHeight: 1.5,
              opacity: 0.82,
            }}
          >
            {selected ===
            question.correct
              ? question.explanation
              : `La respuesta correcta es ${question.options[question.correct]}. ${question.explanation}`}
          </p>

          <button
            onClick={nextQuestion}
            style={{
              marginTop: 18,
              border: 0,
              borderRadius: 999,
              padding:
                "12px 18px",
              cursor: "pointer",
              fontWeight: 900,
              fontSize: 13,
            }}
          >
            {current ===
            questions.length - 1
              ? "VER RESULTADO →"
              : "SIGUIENTE DESAFÍO →"}
          </button>
        </div>
      )}
    </section>
  );
}
