import React, { Component } from "react";
// import Main from './components/main';
import Home from "./components/home";
import Main from "./components/main";
import Logout from "./components/logout";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/main" component={Main} />
          <Route path="/logout" component={Logout} />
        </Router>
      </div>
    );
  }
}

export default App;
