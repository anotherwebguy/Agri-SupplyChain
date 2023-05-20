import axios from "axios";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import SubNav from "../../utils/SubNav";
import ProcessorSidebar from "./ProcessorSidebar";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dbActions } from "../../store/dbSlice";
import { useNavigate } from "react-router-dom";
import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";

function ProcessorBroadcast() {
  const id = useSelector((state) => state.db.userAcc);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const [crop, setCrop] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const reload = useSelector((state) => state.db.reload);
  const paymentAddress = useSelector((state) => state.db.address);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/processorPurchases/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <Fragment>
        <option value={d.crop_id} key={d.crop_id}>
          {d.crop_name}
        </option>
      </Fragment>
    );
  });
  const cropHandler = (e) => {
    setCrop(e.target.value);
  };
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!crop) {
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

        const data = contract.updateStatus(crop);
      }

      axios
        .post(`http://localhost:3001/brodcastToRetailer/${crop}`, {
          product: name,
          quantity: quantity,
          price: price,
          id: id,
        })
        .then((resp) => {
          alert(resp.data);
          navigate("/processor/ybroadcasts");
        });
      setQuantity("");
      setPrice("");
      setCrop("");
      setName("");

      dispatch(dbActions.reload());
    }
  };
  return (
    <div className="home-body">
      <div className="left-body">
        <ProcessorSidebar pbroad="1"></ProcessorSidebar>
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
                    id="available_crop"
                    name="crops"
                    class="form-select form-select-lg mb-3"
                    required
                    onChange={cropHandler}
                    defaultValue=""
                  >
                    <option value="">Please select</option>
                    {/* <option value="Sandy">Maize</option>
                    <option value="Loamy">Chana</option>
                    <option value="Black">Jowar</option>
                    <option value="Red">Wheat</option>
                    <option value="Clayey">Paddy</option> */}
                    {list}
                  </select>
                  <div class="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="temperature"
                      name="temperature"
                      class="form-control"
                      placeholder="Name"
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
                  <div class="text-center">
                    <button
                      type="submit"
                      name="broadcastCrop"
                      class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                    >
                      Add
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

export default ProcessorBroadcast;
