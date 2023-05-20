import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
import { useNavigate } from "react-router-dom";
function RetailerCard(props) {
  const { product, price, retailer, quantity, crop_id } = props;
  const [result, setResult] = useState("");
  const [d, setD] = useState(false);
  const [quantityE, setQuantityE] = useState(1);
  const [priceE, setPriceE] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentAddress = useSelector((state) => state.db.address);
  const id = useSelector((state) => state.db.userAcc);
  let results;
  useEffect(() => {
    axios
      .get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR,")
      .then((response) => {
        setPriceE(response.data.INR);
      });
  }, [priceE]);
  const payment = async (e) => {
    // check if quantity available
    await axios
      .get(`http://localhost:3001/checkAvailability/${crop_id}/${quantityE}`)
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.text == "Enter a valid quantity") {
          alert(resp.data.text);
        } else {
          tp();
          setQuantityE(1);
        }
      });
  };
  const tp = async (e) => {
    const singleUnitPrice = price / quantity;
    const total = singleUnitPrice * quantityE;
    const fin = total / priceE;
    const fin2 = Number(fin).toFixed(18);
    if (typeof window.ethereum !== "undefined" && id != "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = {
        from: id,
        to: retailer,
        value: ethers.utils.parseEther(`${fin2}`),
      };
      await signer.sendTransaction(tx).then((transaction) => {
        console.dir(transaction);
        alert("Payment Done!");
      });

      console.log(tx);
      await axios
        .post(`http://localhost:3001/customerPayment/${crop_id}`, {
          product,
          price: total,

          quantityE,
          seller: retailer,
          buyer: id,
        })
        .then((resp) => {
          console.log(resp.data);
        });

      dispatch(dbActions.reload());
      //   navigate("/consumer");
    }
  };
  const quantityHandler = (e) => {
    setQuantityE(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    payment();
  };
  return (
    <div className="col-5 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              Product - {product}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
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
                Name :
              </span>
              &nbsp;&nbsp;{retailer}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Available Quantity :
              </span>
              &nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
        </div>
        <div className="farmerproduct-body mt-1">
          <form onSubmit={submitHandler}>
            <div class="input-group input-group-outline mb-3">
              <input
                type="number"
                id="N"
                name="N"
                class="form-control"
                placeholder="Enter Quantity"
                onChange={quantityHandler}
                required
                value={quantityE}
                min="1"
              />
            </div>
            <div class="text-center">
              <button
                type="submit"
                name="broadcastCrop"
                class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RetailerCard;
