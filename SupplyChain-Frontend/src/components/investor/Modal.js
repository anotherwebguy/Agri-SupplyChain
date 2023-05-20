import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Modal(props) {
  const [open, setopen] = useState(false);
  const [result, setResult] = useState([]);
  const [amount, setAmount] = useState();
  const [holding, setHolding] = useState();
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  const location = useLocation();
  const seller = location.state.user;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/requestCreditScore/${seller}`)
      .then((response) => {
        results = response.data;
        setResult(results[0].credit_score);
        console.log(response.data);
      });
  }, [reload]);
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };
  const holdingHandler = (e) => {
    setHolding(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/investorRequest/${seller}`, {
        holding,
        amount,
      })
      .then((resp) => {
        alert(resp.data);
      });
    setAmount("");
    setHolding("");
  };
  return (
    <div>
      <div className="d-flex top-header">
        <h3 className="h3f">Credibility score : {result}</h3>
        <button
          onClick={() => setopen(true)}
          className="btn btn-simple btn-info mr-4"
        >
          Make a Deal
        </button>
      </div>
      <ReactModal isOpen={open}>
        <h2 className="text-center mb-5">Deal</h2>
        <form onSubmit={submitHandler}>
          <div class="input-group input-group-outline mb-3">
            <input
              type="number"
              id="amount"
              name="amount"
              class="form-control"
              placeholder="Enter Amount in ₹"
              required
              onChange={amountHandler}
            />
          </div>
          <div class="input-group input-group-outline mb-4">
            <input
              type="number"
              id="share"
              name="share"
              class="form-control"
              required
              placeholder="Interest %"
              max="20"
              onChange={holdingHandler}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-simple btn-success" type="submit">
              Invest
            </button>
            <button
              className="btn btn-simple btn-danger ml-2"
              onClick={() => setopen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}

export default Modal;
