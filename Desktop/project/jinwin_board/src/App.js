import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Route } from "react-router-dom";

import Main from "./pages/Main";
import Write from "./pages/Write";
import Detail from "./pages/Detail";

import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

function App() {
  return (
    <React.Fragment>
      <Header />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={Write} />
        <Route path="/write/:id" exact component={Write} />
        <Route path="/view/:postId" component={Detail} />
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;
