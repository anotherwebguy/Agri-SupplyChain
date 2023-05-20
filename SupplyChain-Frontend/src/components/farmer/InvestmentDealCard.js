import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
function InvestmentDealCard(props) {
  const { crop, quantity, share, amount, date, price } = props;
  const id = useSelector((state) => state.db.userAcc);
  const dispatch = useDispatch();
  const accept = (e) => {
    axios
      .put(`http://localhost:3001/updateInvestment/${id}`)
      .then((response) => {
        alert(response.data);
      });
    dispatch(dbActions.reload());
  };
  const reject = (e) => {
    axios
      .delete(`http://localhost:3001/rejectInvestment/${id}`)
      .then((response) => {
        alert(response.data);
      });
    dispatch(dbActions.reload());
  };
  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder"></p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Crop Name :
              </span>
              &nbsp;&nbsp;{crop}&nbsp;&nbsp;&nbsp;&nbsp;
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
                Price :
              </span>
              &nbsp;&nbsp;₹ {price}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Expiry Day :
              </span>
              &nbsp;&nbsp;{date}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Investment Amount :
              </span>
              &nbsp;&nbsp;₹ {amount}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Interest % :
              </span>
              &nbsp;&nbsp;{share}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="row">
            <button
              type="click"
              name="request"
              class="btn bg-gradient-success btn-lg w-40 ml-3 mr-2 mt-4 text-sm"
              onClick={accept}
            >
              Accept
            </button>
            <button
              type="click"
              name="request"
              class="btn bg-gradient-danger btn-lg w-40 ml-1 mt-4"
              onClick={reject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentDealCard;
