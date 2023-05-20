import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../../css/farmerbroadcast.css";

function FarmerBroadcastCard(props) {
  const { crop, name, price, quantity, id } = props;
  const [priceC, setPriceC] = useState(price);
  const [idC, setIdC] = useState(0);
  const user = useSelector((state) => state.db.userAcc);
  const priceHandler = async (e) => {
    setPriceC(e.target.value);
  };
  const click = async (e) => {
    setIdC(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(idC);
    axios
      .post(`http://localhost:3001/offer/${idC}`, {
        crop,
        name,
        price,
        quantity,
        id,
        user,
        priceC,
      })
      .then((resp) => {
        alert(resp.data);
      });
    setPriceC(price);
  };
  return (
    <div className="col-xl-3 col-sm-6 mb-xl-5 mb-4">
      <form onSubmit={submitHandler}>
        <div className="card" key={id}>
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10">grass</i>
            </div>

            <div className="text-end pt-1">
              <p className="text-md mb-0 text-capitalize">{crop}</p>
              <h4 className="mb-0 mt-3">{name}</h4>
            </div>
          </div>
          <hr className="dark horizontal my-0"></hr>
          <div className="row">
            <div className="card-footer p-2">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">
                  Expected Price :
                </span>
                &nbsp;&nbsp;₹{price}&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </div>
            <div className="card-footer p-2">
              <p className="mb-0">
                <span className="text-success text-sm font-weight-bolder">
                  Available :
                </span>
                &nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
            </div>
          </div>
          <div className="farmerproduct-body">
            <div class="input-group input-group-outline mb-3">
              <input
                type="number"
                id="P"
                name="P"
                class="form-control"
                placeholder="Price Quoted"
                required
                onChange={priceHandler}
                value={priceC}
              />
            </div>
            <div class="text-center">
              <button
                type="submit"
                name="broadcastCrop"
                class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                value={id}
                onClick={click}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FarmerBroadcastCard;
