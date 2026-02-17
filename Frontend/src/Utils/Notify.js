import toast from "react-hot-toast";
const colors = {
  success: "#22c55e",
  error: "#ef4444",
  loading: "#eab308",
};

const notify = (type, message) => {
  const accent = colors[type] || "#22c55e";

  toast[type](message, {
    duration: 4000,
    position: "top-center",
    style: {
      background: "rgba(15, 23, 42, 0.75)", // dark glass
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)",

      color: "#f8fafc", // high-contrast text

      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderLeft: `4px solid ${accent}`, // clean accent indicator

      borderRadius: "14px",
      padding: "14px 18px",

      boxShadow: `
        0 10px 30px rgba(0,0,0,0.45)
      `,

      fontWeight: "500",
    },

    iconTheme: {
      primary: colors[type] || "#22c55e",
      secondary: "#020617",
    },
  });
};

export default notify;
