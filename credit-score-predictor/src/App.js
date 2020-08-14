import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Login from "./Login"
import Insights from './Insights.js'
import NavigationBar from './NavigationBar.js'

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Router>
      <Switch>
            <Route path="/login" component={Login} />
            <Route path="/insights" component={Insights} />
            <Route path="/" component={Insights} />
          </Switch>
          </Router>
    </div>
  );
}

export default App;
