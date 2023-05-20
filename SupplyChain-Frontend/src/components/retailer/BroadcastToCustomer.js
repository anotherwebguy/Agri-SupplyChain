import SubNav from "../../utils/SubNav";
import RetailerSidebar from "./RetailerSidebar";
import axios from "axios";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dbActions } from "../../store/dbSlice";
import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";

function BroadcastToCustomer() {
  const id = useSelector((state) => state.db.userAcc);
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const paymentAddress = useSelector((state) => state.db.address);
  const [price, setPrice] = useState("");
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/retailerPurchases/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <Fragment>
        <option value={d.crop_id} key={d.crop_id}>
          {d.product_name}
        </option>
      </Fragment>
    );
  });
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Select a crop");
    } else {
      if (typeof window.ethereum !== "undefined" && id != "") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          paymentAddress,
          Payment.abi,
          signer
        );

        const data = contract.updateStatus(name);
      }
      axios
        .post(`http://localhost:3001/brodcastToCustomer/${name}`, {
          price: price,
          brodcaster: id,
        })
        .then((resp) => {
          alert(resp.data);
          navigate("/retailer/processorbroadcast");
        });

      setPrice("");

      setName("");

      dispatch(dbActions.reload());
    }
  };
  return (
    <div className="home-body">
      <div className="left-body">
        <RetailerSidebar broadcastToCustomer="1"></RetailerSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Broadcast"></SubNav>
        <div className="broadcast-body">
          <h3>Add a new Broadcast!</h3>
          <div className="broadcast-form">
            <div class="card">
              <div class="card-header p-3 pt-2">
                <div class="icon icon-lg icon-shape bg-gradient-danger shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  <i class="material-icons opacity-10">question_answer</i>
                </div>
                <div class="text-end pt-1">
                  <h4 class="mb-0 text-info">Details</h4>
                </div>
              </div>
              <div className="crop-body">
                <form onSubmit={submitHandler}>
                  <select
                    id="produce"
                    name="retailer"
                    class="form-select form-select-lg mb-3"
                    onChange={nameHandler}
                  >
                    <option selected="selected" disabled="disabled">
                      Select Produce
                    </option>
                    {list}
                  </select>

                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="temperature"
                      name="temperature"
                      class="form-control"
                      placeholder="Price (in ₹)"
                      required
                      value={price}
                      onChange={priceHandler}
                    />
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      name="broadcastCrop"
                      class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                    >
                      Broadcast
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

export default BroadcastToCustomer;
