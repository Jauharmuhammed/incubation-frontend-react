import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Messages from "./context/Messages";
import ApplicationViewContextProvider from "./context/ApplicationViewContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Router>
    <Messages>
      <AuthProvider>
        <ApplicationViewContextProvider>
          <App />
        </ApplicationViewContextProvider>
      </AuthProvider>
    </Messages>
  </Router>
  // </React.StrictMode>
);
