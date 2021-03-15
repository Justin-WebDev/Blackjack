import React from "react";
import ReactDOM, { hydrate } from "react-dom";

import App from "./App";
import "./styles.scss";

var mountNode = document.getElementById("app");
hydrate(<App />, mountNode);
// ReactDOM.render(<App />, mountNode);
