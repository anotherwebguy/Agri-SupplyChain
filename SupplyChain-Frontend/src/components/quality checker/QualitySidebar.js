import React, { useEffect } from "react";
import '../../css/bootstrap.css'
import logo from '../../images/logo-ct.png'
import '../../css/material-dashboard.css'
import '../../css/sidebar.css'
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";


function QualitySidebar(props) {

    const {qreport} = props

  return (
    <div className='sidebar-body'>
      <div className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-0 fixed-start ms-0   bg-gradient-dark" id="sidenav-main">
        <div className="baju sidenav-header">
          <a className="navbar-brand m-0" target="_blank">
            <img src={logo}
              className="navbar-brand-img"
              alt="main_logo" />
            <span className="ms-1 font-weight-bold text-white">AgriChain</span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100 mb-3"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item nav-tile">
              <Link to='/inspector'>
                <a
                  className={`nav-link text-white ${qreport ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">dashboard</i>
                  </div>
                  <span className="nav-link-text ms-1">Quality Reports</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QualitySidebar;
