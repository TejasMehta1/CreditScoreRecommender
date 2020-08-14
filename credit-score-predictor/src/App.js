import React from 'react';
import logo from './logo.svg';
import './App.css';
import Insights from './Insights.js'
import NavigationBar from './NavigationBar.js'

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Insights/>
    </div>
  );
}

export default App;
