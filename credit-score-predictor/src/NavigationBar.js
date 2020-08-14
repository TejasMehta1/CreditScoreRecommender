import React from 'react';
import { BrowserRouter, Link, useHistory, withRouter } from "react-router-dom"
import WhyShouldICare from './WhyShouldICare'
import Logo from "./logo"
import './App.css';
import cap1Img from "./images/cap1.svg"



function NavigationBar() {
  let history = useHistory();
  function handleInsightsClick() {
    history.push("/insights");
  }
  function handleWhyClick() {
    history.push("/why");
  }
  return (
    // <>
    //   <BrowserRouter>
    //     <div className="navBar">
    //       <Link to="/insights">
    //         <div className="navBar-logo-wrapper">
    //           <Logo />
    //         </div>
    //       </Link>
    //       <div className="poweredByCap1">
    //       <p>
    //         powered by
    //       </p>
    //       <a href="https://capitalone.com"><img className="cap1Image" src="cap1Img" alt="capital one"></img></a>
    //       </div>
    //     <div className="pages">
    //     </div>
    //     <Link
    //           to="/why"
    //     >
    //           <div className="navBar-logo-wrapper why-care-wrapper">
    //             <div className="cred-logo">
    //               Why should I care?
    //             </div>
    //           </div>
    //     </Link>
        
    // </div>
    // </BrowserRouter>
    // </>
    <>
    <div className="navBar">
        <a className="navBar-logo-wrapper" onClick={handleInsightsClick}>
          <Logo />
        </a>
      <div className="poweredByCap1">
      <p>
        powered by
      </p>
      <a href="https://capitalone.com"><img className="cap1Image" src={cap1Img} alt="capital one"></img></a>
      </div>
    <div className="pages">
    </div>

          <a className="navBar-logo-wrapper why-care-wrapper" onClick={handleWhyClick}>
            <div className="cred-logo">
              Why should I care?
            </div>
          </a>
    
</div>
</>
  );
}

export default withRouter(NavigationBar);
