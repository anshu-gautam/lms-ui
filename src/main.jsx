import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
            boxShadow:
              "0 0 10px rgba(0, 0, 200, 0.4), 0 0 10px rgba(255, 255, 255, 0.4)",
          },
        }}
      />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
