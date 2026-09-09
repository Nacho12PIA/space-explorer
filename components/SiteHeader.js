import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "relative",
        zIndex: 1000000,
        width: "100%",
        minHeight: 58,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "10px 16px",
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
          gap: 14,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: 1.3,
            whiteSpace: "nowrap",
          }}
        >
          SPACE EXPLORER
        </span>

        <div
          aria-hidden="true"
          style={{
            width: 1,
            height: 22,
            background: "rgba(255,255,255,0.12)",
          }}
        />

        <div
          aria-label="Future navigation"
          style={{
            minWidth: 44,
            minHeight: 32,
          }}
        />
      </div>

      <LanguageSwitcher />
    </header>
  );
}
