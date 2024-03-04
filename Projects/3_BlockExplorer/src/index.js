import ReactDOM from "react-dom";
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Block from "./modules/Block/Block";
import Redirect from "./modules/redirect";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={<Redirect to="/block/last" />} />
    <Route path="/block/:block" component={Block} />
    <Route path="/tx/:tx" component={<></>} />
    <Route path="/account/:account" component={<></>} />
  </Router>,
  document.getElementById("root")
);
