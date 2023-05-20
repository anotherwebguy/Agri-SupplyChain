import React, { useEffect } from "react";
import "../../css/bootstrap.css";
import logo from "../../images/logo-ct.png";
import "../../css/material-dashboard.css";
import "../../css/sidebar.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Home from "./Dashboard";
import Prediction from "./Prediction";
import Recommendation from "./Recommendation";
import Dashboard from "./Dashboard";

function Sidebar(props) {
  let {
    dash,
    pred,
    rec,
    fer,
    broad,
    farmbroad,
    micro,
    proreq,
    trans,
    status,
    investor,
    accepted,
    payback,
  } = props;
  return (
    <div className="sidebar-body">
      <div
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-0 fixed-start ms-0   bg-gradient-dark"
        id="sidenav-main"
      >
        <div className="baju sidenav-header">
          <a className="navbar-brand m-0" target="_blank">
            <img src={logo} className="navbar-brand-img" alt="main_logo" />
            <span className="ms-1 font-weight-bold text-white">AgriChain</span>
          </a>
        </div>
        <hr className="horizontal light mt-0 mb-2" />
        <div
          className="collapse navbar-collapse  w-auto  max-height-vh-100"
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item nav-tile">
              <Link to="/farmer">
                <a
                  className={`nav-link text-white ${dash ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">dashboard</i>
                  </div>
                  <span className="nav-link-text ms-1">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="nav-item mt-3">
              <h6 className="baju ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
                Features
              </h6>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/predictions">
                <a
                  className={`nav-link text-white ${pred ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">
                    Crop Price Predictor
                  </span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/recommendations">
                <a
                  className={`nav-link text-white ${rec ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Recommendations</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/broadcast">
                <a
                  className={`nav-link text-white ${broad ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Broadcast</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/farmerbroadcast">
                <a
                  className={`nav-link text-white ${farmbroad ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Farmer Broadcasts</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/status">
                <a
                  className={`nav-link text-white ${status ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Track Status</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/transactions">
                <a
                  className={`nav-link text-white ${trans ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Transactions</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/microfinance">
                <a
                  className={`nav-link text-white ${micro ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Micro Finance</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/payback">
                <a
                  className={`nav-link text-white ${payback ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Payback</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/processorRequests">
                <a
                  className={`nav-link text-white ${proreq ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Processor Requests</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/investordeals">
                <a
                  className={`nav-link text-white ${investor ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Investor Deals</span>
                </a>
              </Link>
            </li>
            <li className="nav-item nav-tile">
              <Link to="/farmer/accepted">
                <a
                  className={`nav-link text-white ${accepted ? "active bg-gradient-success" : ""
                    }`}
                >
                  <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">table_view</i>
                  </div>
                  <span className="nav-link-text ms-1">Accepted Deals</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
