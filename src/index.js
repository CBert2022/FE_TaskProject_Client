import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProviderWrapper } from "./context/auth.context";
 
import { BrowserRouter as Router } from "react-router-dom";

 
ReactDOM.render(
  <AuthProviderWrapper>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
 </AuthProviderWrapper>,
  document.getElementById("root")
);
 
reportWebVitals();
