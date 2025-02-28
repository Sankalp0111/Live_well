import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Suspense fallback={<Loader/>}>
        <HashRouter>
          <App />
        </HashRouter>
      </Suspense>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. Check your index.html.");
}

reportWebVitals();
