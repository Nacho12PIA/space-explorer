"use client";

import { useEffect } from "react";

const experimentTitles = {
  gravity: ["SUPERGRAVEDAD", "SUPERGRAVITY"],
  orbits: ["DOMINA UNA ÓRBITA", "MASTER AN ORBIT"],
  daynight: ["FABRICA UN DÍA", "MAKE A DAY"],
  blackhole: ["AGUJERO NEGRO", "BLACK HOLE"],
  impact: ["IMPACTO DE ASTEROIDE", "ASTEROID IMPACT"],
};

export default function LaboratoryDeepLink() {
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("experiment");
    const titles = experimentTitles[requested];
    if (!titles) return;

    let attempts = 0;
    const openRequestedExperiment = () => {
      attempts += 1;
      const buttons = [...document.querySelectorAll("button")];
      const target = buttons.find((button) => {
        const text = (button.textContent || "").toUpperCase();
        return titles.some((title) => text.includes(title));
      });

      if (target) {
        target.click();
        return;
      }

      if (attempts < 20) window.setTimeout(openRequestedExperiment, 100);
    };

    openRequestedExperiment();
  }, []);

  return null;
}
