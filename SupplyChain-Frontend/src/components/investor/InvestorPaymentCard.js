import React from "react";

import { useState, useEffect } from "react";
import axios from "axios";
import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
function InvestorPaymentCard(props) {
  const { farmerId, crop, amount, yieldId, share, quantity, price } = props;
  const dispatch = useDispatch();
  const paymentAddress = useSelector((state) => state.db.address);
  const userId = useSelector((state) => state.db.userAcc);
  const [priceE, setPriceE] = useState(0);
  let results;
  useEffect(() => {
    axios
      .get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR,")
      .then((response) => {
        setPriceE(response.data.INR);
      });
  }, [priceE]);
  const paymentHandler = async (e) => {
    // pay karo

    const fin = price / priceE;
    // const fin2 = ethers.utils.parseEther(`${fin}`.toString());
    console.log(fin);
    const fin2 = Number(fin).toFixed(18);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = {
        from: userId,
        to: farmerId,
        value: ethers.utils.parseEther(`${fin2}`),
      };
      await signer.sendTransaction(tx).then((transaction) => {
        console.dir(transaction);
        alert("Payment Done!");
      });

      await axios
        .put(`http://localhost:3001/paidFarmerByInvestor/${farmerId}`)
        .then((resp) => {
          console.log(resp.data);
        });
      dispatch(dbActions.reload());
    }
  };
  return (
    <div className="col-3">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              {farmerId}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Crop :
              </span>
              &nbsp;&nbsp;{crop}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                quantity :
              </span>
              &nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Amount :
              </span>
              &nbsp;&nbsp;₹{price}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Yield Days :
              </span>
              &nbsp;&nbsp;{yieldId}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Amount :
              </span>
              &nbsp;&nbsp;₹{amount}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Share :
              </span>
              &nbsp;&nbsp;{share}%&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div class="text-center mb-1">
            <button
              type="click"
              name="broadcastCrop"
              class="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"
              onClick={paymentHandler}
            >
              Pay ₹{amount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorPaymentCard;
