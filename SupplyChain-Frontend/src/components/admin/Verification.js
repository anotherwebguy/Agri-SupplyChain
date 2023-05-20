import React from 'react'
import VerificationList from '../../utils/VerificationList'
import '../../css/verification.css'
import '../../css/bootstrap.css'
import '../../css/material-dashboard.css'
import block from '../../images/logo-ct.png'

function Verification() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
                <img src={block} width="30" height="30" class="d-inline-block align-top" alt="" />&nbsp;&nbsp;
                <a className="navbar-brand" href="/admin"><h5>Admin panel</h5></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/admin/verification"><h5>Verification</h5> <span className="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <VerificationList />
        </div>
    )
}

export default Verification
