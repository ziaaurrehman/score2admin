import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Favicon from "react-favicon";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Favicon url="https://raw.githubusercontent.com/ziaaurrehman/score2admin/main/client/src/assets/favicon.ico" />
    <App />
  </BrowserRouter>
);
