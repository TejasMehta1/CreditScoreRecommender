import React from 'react';
import { BrowserRouter, Link } from "react-router-dom"

import WhyShouldICare from './WhyShouldICare'
import Logo from "./logo"
import './App.css';

function NavigationBar() {
  return (
    <>
      <BrowserRouter>
        <div className="navBar">
          <Link to="/insights">
            <div className="navBar-logo-wrapper">
              <Logo />
            </div>
          </Link>
      
        <div className="pages">
        </div>
        <div className="navBar-logo-wrapper why-care-wrapper">
      <WhyShouldICare />
        </div>
    </div>
    </BrowserRouter>
    </>
  );
}

export default NavigationBar;
