import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import "../../css/investor.css";
import Farmer from "./Farmer";
import Modal from "./Modal";
function FarmerInvestorCard(props) {
  const { user, crop_name, quantity, price, yield_date } = props;
  const navigate = useNavigate();

  const setview = () => {
    navigate("/investor/farmer", { state: { user } });
  };

  return (
    <div className="col-sm-3 mb-4">
      <div className="card investor-card" onClick={setview}>
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              {user}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Crop Name :
              </span>
              &nbsp;&nbsp;{crop_name}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>

          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quantity :
              </span>
              &nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Expected Price :
              </span>
              &nbsp;&nbsp;{price}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Yield Date :
              </span>
              &nbsp;&nbsp;{yield_date}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerInvestorCard;
