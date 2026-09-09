"use client";

import { useEffect, useMemo, useRef } from "react";
import SolarSystem from "./SolarSystem";
import { useLanguage } from "../i18n/LanguageContext";
import { planets } from "../data/planets";

const staticKeys = {
  "Explora. Descubre. Aprende.": "solarSystem.tagline",
  "Arrastra para girar · Pellizca para hacer zoom": "solarSystem.controls",
  "Volviendo al Sistema Solar…": "solarSystem.returning",
  "VISTA GENERAL": "solarSystem.navigation.overview",
  "SUPERFICIE": "solarSystem.navigation.surface",
  "ATMÓSFERA": "solarSystem.navigation.atmosphere",
  "LUNAS": "solarSystem.navigation.moons",
  "EXPLORANDO": "solarSystem.exploring",
  "← SISTEMA SOLAR": "solarSystem.solarSystem",
  "Diámetro": "solarSystem.overview.diameter",
  "Duración del día": "solarSystem.overview.day",
  "Gravedad": "solarSystem.overview.gravity",
  "Duración del año": "solarSystem.overview.year",
  "¿SABÍAS QUE...?": "solarSystem.overview.didYouKnow",
  "Sol": "planets.sun.name",
  "Luna": "planets.moon",
};

export default function LocalizedSolarSystem() {
  const rootRef = useRef(null);
  const { language, t } = useLanguage();

  const translations = useMemo(() => {
    const map = new Map();

    Object.entries(staticKeys).forEach(([spanish, key]) => {
      map.set(spanish, t(key, spanish));
    });

    planets.forEach((planet) => {
      const base = `planets.${planet.id}`;
      map.set(planet.name, t(`${base}.name`, planet.name));
      map.set(planet.description, t(`${base}.description`, planet.description));
      map.set(planet.fact, t(`${base}.fact`, planet.fact));
      map.set(planet.diameter, t(`${base}.diameter`, planet.diameter));
      map.set(planet.day, t(`${base}.day`, planet.day));
      map.set(planet.year, t(`${base}.year`, planet.year));
      map.set(planet.gravity, t(`${base}.gravity`, planet.gravity));
    });

    return map;
  }, [language, t]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const translateTextNode = (node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const original = node.__spaceExplorerOriginal ?? node.nodeValue;
      node.__spaceExplorerOriginal = original;

      const trimmed = original.trim();
      if (!trimmed) return;

      const normalized = trimmed.replace(/\s+/g, " ");
      const translated = translations.get(normalized);
      if (!translated) {
        node.nodeValue = original;
        return;
      }

      const leading = original.match(/^\s*/)?.[0] ?? "";
      const trailing = original.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${leading}${translated}${trailing}`;
    };

    const translateTree = (target) => {
      if (target.nodeType === Node.TEXT_NODE) {
        translateTextNode(target);
        return;
      }

      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        translateTextNode(node);
        node = walker.nextNode();
      }
    };

    translateTree(root);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateTree);
      });
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language, translations]);

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      <SolarSystem />
    </div>
  );
}
