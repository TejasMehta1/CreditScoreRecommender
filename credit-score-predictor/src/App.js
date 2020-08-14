import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Login from "./login"
import Insights from './Insights.js'
import NavigationBar from './NavigationBar.js'
import WhyShouldICare from './WhyShouldICare.jsx'
import UserForm from "./UserForm"

function App() {
  return (
    <Router>
    <div className="App">
      <NavigationBar/>
          <Switch>
            <Switch>
            <Route path="/login" render={() => <Login />} />
            <Route path="/form" render={( () => <UserForm />)} />
            <Route path="/insights" render={ () => <Insights />} />
            <Route path="/why" render={() => <WhyShouldICare/>} />
            <Route path="/" render={() => <Login/>} />
            </Switch>
          </Switch>
    </div>
    </Router>
  );
}

export default App;
