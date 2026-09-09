import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader() {
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
        <span
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          SPACE EXPLORER
        </span>

        <div
          aria-hidden="true"
          style={{
            width: 1,
            height: 18,
            background: "rgba(255,255,255,0.12)",
          }}
        />

        <div
          aria-hidden="true"
          style={{
            minWidth: 16,
            minHeight: 24,
          }}
        />
      </div>

      <LanguageSwitcher />
    </header>
  );
}
