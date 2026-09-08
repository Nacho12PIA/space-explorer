import Link from "next/link";
import SolarSystem from "../../components/SolarSystem";

export default function ExploraPage() {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          zIndex: 50,
          color: "white",
          textDecoration: "none",
          background: "rgba(4, 10, 25, 0.72)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: 999,
          padding: "10px 14px",
          fontSize: 12,
          fontWeight: 800,
          backdropFilter: "blur(10px)",
        }}
      >
        ← INICIO
      </Link>

      <SolarSystem />
    </main>
  );
}
