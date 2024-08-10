// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";
// import "./App.css";
// import { BrowserRouter as Route } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// ReactDOM.render(
//   <Route>
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Route>,
//   document.getElementById("root")
// );


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
