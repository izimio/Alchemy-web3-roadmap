import ReactDOM from "react-dom";
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Block from "./modules/Block/Block";
import Redirect from "./modules/redirect";
import Account from "./modules/Account/Account";
import TxModule from "./modules/Tx/TxModule";

ReactDOM.render(
  <Router>
      <h2>Blockchain Explorer</h2>
    <Route exact path="/" component={Redirect} />
    <Route path="/block/:block" component={Block} />
    <Route path="/tx/:tx" component={TxModule} />
    <Route path="/account/:account" component={Account} />
  </Router>,
  document.getElementById("root")
);
