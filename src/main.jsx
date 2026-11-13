/* ==========================================================================
   ENTRY POINT
   Mounts the React app and loads global styles. You rarely need to edit this.
   BrowserRouter enables page-to-page navigation (Step 2).
   ========================================================================== */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/global.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
