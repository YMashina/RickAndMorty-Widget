import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store";

axios.defaults.baseURL = "https://rickandmortyapi.com/api/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
