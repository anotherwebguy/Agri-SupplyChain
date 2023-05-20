import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../images/logo-ct.png'

function InvestorSidebar(props) {

    const { dash, farmb, payment, status, investments } = props;

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
                            <Link to='/investor'>
                                <a
                                    className={`nav-link text-white ${dash ? "active bg-gradient-info" : ""}`}>
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
                            <Link to='/investor/farmerbroadcast'>
                                <a
                                    className={`nav-link text-white ${farmb ? "active bg-gradient-info " : ""}`}>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">dashboard</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Farmer Broadcast</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item nav-tile">
                            <Link to='/investor/payments'>
                                <a
                                    className={`nav-link text-white ${payment ? "active bg-gradient-info" : ""}`}>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">dashboard</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Pending Payments</span>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item nav-tile">
                            <Link to='/investor/investments'>
                                <a
                                    className={`nav-link text-white ${investments ? "active bg-gradient-info" : ""}`}>
                                    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                        <i className="material-icons opacity-10">dashboard</i>
                                    </div>
                                    <span className="nav-link-text ms-1">Investments</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InvestorSidebar