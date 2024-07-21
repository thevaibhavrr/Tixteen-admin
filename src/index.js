import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import { BrowserRouter as Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Route>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Route>,
  document.getElementById("root")
);
