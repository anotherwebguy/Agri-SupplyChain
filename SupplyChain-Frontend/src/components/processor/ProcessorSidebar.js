import React, { useEffect } from "react";
import '../../css/bootstrap.css'
import logo from '../../images/logo-ct.png'
import '../../css/material-dashboard.css'
import '../../css/sidebar.css'
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";


function ProcessorSidebar(props) {
  let { dash, pbroad, ybroad, orderDetails, fbroad, pInterest, ppayment, status } = props;
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
              <Link to='/processor'>
                <a
                  className={`nav-link text-white ${dash ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">dashboard</i>
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="nav-item mt-3">
              {/* <h6 className="baju ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
                Retail-Trade
              </h6> */}
              <div className="ps-4 ms-2 pb-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Retailer Trade</div>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/broadcast'>
                <a className={`nav-link text-white ${pbroad ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Broadcast</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/ybroadcasts'>
                <a className={`nav-link text-white ${ybroad ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Your Broadcasts</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/orderDetails'>
                <a className={`nav-link text-white ${orderDetails ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Order Details</span>
                </a>
              </Link>
            </li>
            <li className="nav-item mt-3">
              <div className="ps-4 ms-2 pb-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Farmer Trade</div>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/fbroadcasts'>
                <a className={`nav-link text-white ${fbroad ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Farmer Broadcasts</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/pInterest'>
                <a className={`nav-link text-white ${pInterest ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Processor Interest</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/payments'>
                <a className={`nav-link text-white ${ppayment ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Pending Payments</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to='/processor/status'>
                <a className={`nav-link text-white ${status ? "active bg-gradient-danger" : ""}`}>
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Track Status</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProcessorSidebar;
