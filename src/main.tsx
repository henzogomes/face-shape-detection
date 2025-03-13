import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tailwind.css";
import posthog from "posthog-js";

// Initialize PostHog
posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY ?? "", {
  api_host:
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  loaded: (posthog) => {
    if (import.meta.env.DEV) posthog.debug();
  },
  autocapture: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
