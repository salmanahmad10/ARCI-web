import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect 
} from "react-router-dom";
import mainpage from "./pages/mainpage"
import dashboard from "./pages/dashboard"
import linkedin_setting from "./pages/linkedin_setting"
import linkedin_status from "./pages/linkedin_status"
import noPageFound from "./pages/404"
import scheduler from "./pages/scheduler"
import pubmed_setting from "./pages/pubmed_setting"
import pubmed_status from "./pages/pubmed_status"
class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path="/" component={mainpage}></Route>
          <Route exact path="/404" component={noPageFound}></Route>
          <Route exact path="/dashboard" component={dashboard}></Route>
          <Route exact path="/linkedin_status" component={linkedin_status}></Route>
          <Route exact path="/linkedin_setting" component={linkedin_setting}></Route>
          <Route exact path="/scheduler" component={scheduler}></Route>
          <Route exact path="/pubmed_setting" component={pubmed_setting}></Route>
          <Route exact path="/pubmed_status" component={pubmed_status}></Route>
          <Redirect to="/404" />
        </Switch>
      </Router>
    )
  }
}

export default App;
