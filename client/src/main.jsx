import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import NextTopLoader from "nextjs-toploader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NextTopLoader height={3} />
    <App />
  </BrowserRouter>
);
