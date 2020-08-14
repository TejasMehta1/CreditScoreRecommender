import React from 'react';
import WhyShouldICare from './WhyShouldICare'
import Logo from "./logo"
import './App.css';

function NavigationBar() {
  return (
    <div className="navBar">
      <div className="navBar-logo-wrapper">
        <Logo />
        </div>
      
        <div className="pages">
        </div>
        <div className="navBar-logo-wrapper why-care-wrapper">
      <WhyShouldICare />
        </div>
    </div>
  );
}

export default NavigationBar;
