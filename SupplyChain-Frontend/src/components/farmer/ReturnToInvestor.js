import React, { useState, useEffect } from "react";
import SubNav from "../../utils/SubNav";
import axios from "axios";

import Sidebar from "./Sidebar";
import "../../css/returnToInvestor.css";

import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";
function ReturnToInvestor() {
  const [render, setRender] = useState(true);
  const [result, setResult] = useState([]);
  const [date, setDate] = useState();
  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const [amount, setAmount] = useState();
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  const dispatch = useDispatch();
  const paymentAddress = useSelector((state) => state.db.address);
  const userId = useSelector((state) => state.db.userAcc);
  const [priceE, setPriceE] = useState(0);

  let results;

  useEffect(() => {
    axios.get(`http://localhost:3001/payback/${id}`).then((response) => {
      results = response.data;
      setResult(results);
      setName(results[0].user);
      setCrop(results[0].crop_name);
      setDate(results[0].days_left);
      setAmount(results[0].amount);
      setRender(false);
      console.log(response.data);
    });
  }, [reload]);

  useEffect(() => {
    axios
      .get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR,")
      .then((response) => {
        setPriceE(response.data.INR);
      });
  }, [priceE]);
  const payment = async (e) => {
    // pay karo

    const fin = (amount * 0.1 + amount) / priceE;
    // const fin2 = ethers.utils.parseEther(`${fin}`.toString());
    console.log(fin);
    const fin2 = Number(fin).toFixed(18);
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = {
        from: userId,
        to: "0xc6190Db496B9091DB3cBed14B1FCD707d62a7821",
        value: ethers.utils.parseEther(`${fin2}`),
      };
      await signer.sendTransaction(tx).then((transaction) => {
        console.dir(transaction);
        alert("Payment Done!");
      });

      await axios
        .put(`http://localhost:3001/paidToInvestor/${userId}`)
        .then((resp) => {
          console.log(resp.data);
        });
      setRender(true);
      dispatch(dbActions.reload());
    }
  };
  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar payback="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Pay Back To Investor"></SubNav>
        {render ? (
          <h1>Not pending</h1>
        ) : (
          <div className="broadcast-body">
            <h3>Countdown : {date}</h3>
            <div className="roi-card">
              <div className="roi-header">
                <table>
                  <tr>
                    <th>Pending Payment</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </tr>
                </table>
              </div>
              <div className="cardy-body">
                <table>
                  <tr>
                    <th>Investor Name :</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <th>Crop :</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{crop}</td>
                  </tr>
                  <tr>
                    <th>Address :</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>1234 Main St, New York, NY 10001</td>
                  </tr>
                  <tr>
                    <th>Amount :</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{amount * 0.1 + amount}</td>
                  </tr>
                </table>
              </div>
              <div className="cardy-footer text-muted text-center">
                <button
                  type="button"
                  className="btn btn-success siza"
                  onClick={payment}
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnToInvestor;
