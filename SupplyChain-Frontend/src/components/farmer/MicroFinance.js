import React, { useEffect, useState } from "react";
import SubNav from "../../utils/SubNav";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
function MicroFinance() {
  const [dates, setDates] = useState();
  const [name, setName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const id = useSelector((state) => state.db.userAcc);
  const dateHandler = (e) => {
    setDates(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(`http://localhost:3001/microFinance`, {
        dates,
        name,
        quantity,
        price,
        id,
      })
      .then((resp) => {
        console.log("yahan aagaya");
        alert(resp.data);
      });
    setDates("");
    setName("");
    setPrice("");
    setQuantity("");
  };
  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar micro="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Micro Finance"></SubNav>
        <div className="broadcast-body">
          <h3>Broadcast for Micro Finance!</h3>
          <div className="broadcast-form">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  <i class="material-icons opacity-10">question_answer</i>
                </div>
                <div class="text-end pt-1">
                  <h4 class="mb-0 text-info">Details</h4>
                </div>
              </div>
              <div className="crop-body">
                <form onSubmit={submitHandler}>
                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="K"
                      name="K"
                      class="form-control"
                      placeholder="Crop Name"
                      required
                      value={name}
                      onChange={nameHandler}
                    />
                  </div>

                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      class="form-control"
                      placeholder="Quantity"
                      required
                      value={quantity}
                      onChange={quantityHandler}
                    />
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      class="form-control"
                      placeholder="Expected Price (in ₹)"
                      required
                      value={price}
                      onChange={priceHandler}
                    />
                  </div>
                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      class="form-control"
                      placeholder="Expected Date of Yield Produce"
                      required
                      value={dates}
                      min="7"
                      max="365"
                      onChange={dateHandler}
                    />
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      name="broadcastCrop"
                      class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MicroFinance;
