import toast from "react-hot-toast"

const colors = {
  success: "#22c55e",
  error: "#ef4444",
  loading: "#eab308",
};

const notify = (type, message) => {
  toast[type](message, {
    duration: 4000,
    position: "top-center",
    style: {
      background: "#0f172a",
      color: "#e5e7eb",
      border: `1px solid ${colors[type] || "#22c55e"}`,
      borderRadius: "0.75rem",
    },
    iconTheme: {
      primary: colors[type] || "#22c55e",
      secondary: "#020617",
    },
  });
};

export default notify;