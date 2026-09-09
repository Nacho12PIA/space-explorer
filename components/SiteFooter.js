export default function SiteFooter() {
  return (
    <footer
      style={{
        width: "100%",
        minHeight: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 18px",
        background: "#071a14",
        borderTop: "1px solid rgba(74,222,128,0.22)",
        color: "rgba(255,255,255,0.62)",
        fontSize: 11,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px 18px",
        }}
      >
        <span>© SPACE EXPLORER</span>
        <span>Aviso legal</span>
        <span>Privacidad</span>
        <span>Cookies</span>
      </div>
    </footer>
  );
}
