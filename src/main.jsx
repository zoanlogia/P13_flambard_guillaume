import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router/Router.jsx";
import { Provider } from "react-redux";
import {store} from "./store/store.js";
import 'bootstrap/dist/css/bootstrap.min.css';

// Assurez-vous que c'est le bon chemin

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
