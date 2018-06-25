import * as React from "react";
import { render } from "react-dom";
import { App } from "./containers/App";

import "./styles/styles.css";
// Now we can render our application into it.

render(<App />, document.getElementById("app"));
