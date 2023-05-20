import React from "react";
import "../css/bootstrap.css";
import "../css/welcome.css";
import Farmer from "../images/farmer.png";
import Quality from "../images/quality.png";
import Earth from "../images/earth.png";
import Consumer from "../images/consumer.png";
import block from "../images/blockchain.png";
import currency from "../images/currency.png";
import stock from "../images/stock.png";
import Investor from "../images/investor.png";
import Producer from "../images/producer.png";
import Retailer from "../images/retailer.png";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Axios from "axios";
import { dbActions } from "../store/dbSlice";
import { Link, useNavigate } from "react-router-dom";

function Welcome() {
  const [userAccount, setUserAccount] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);
  const register = () => {
    navigate("/register");
  };
  async function requestAccount() {
    if (window.ethereum) {
      console.log("detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]);

        Axios.post("http://localhost:3001/authentication", {
          userAccount: accounts[0],
        }).then((resp) => {
          if (
            resp.data != "farmer" &&
            resp.data != "processor" &&
            resp.data != "retailer" &&
            resp.data != "consumer" &&
            resp.data != "investor" &&
            resp.data != "admin" &&
            resp.data != "qualitychecker"
          ) {
            alert("Register yourself or wait for approval from admin");
          } else {
            dispatch(dbActions.role(resp.data));
            navigate(`${resp.data}`);
          }
        });

        dispatch(dbActions.logIn());
        dispatch(dbActions.userAccount(accounts[0]));
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
    } else {
      alert("No metamask Found");
    }
  };
  const log = () => {
    connectMetamask();
  };
  return (
    <div>
      <body
        className="body-wrapper"
        data-spy="scroll"
        data-target=".privacy-nav"
      >
        {/* Orange banner */}
        <section className="section gradient-banner">
          <div className="shapes-container">
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
            <div className="shape"></div>
          </div>
          <div className="container">
            <div className="idr row align-items-center">
              <div className="col-md-6 order-2 order-md-1 text-center text-md-left">
                <h1 className="text-white font-weight-bold mb-4">
                  SupplyChain
                </h1>
                <p className="text-white mb-5">
                  {" "}
                  DApp designed for farmers to provide full end to end solution
                  which will help to produce and sell yields at a good rate
                </p>
                <div>
                  <button className="btn btn-main-md" onClick={log}>
                    LOG IN
                  </button>
                  &nbsp;&nbsp;
                  {/* <button className="btn btn-main-md">SIGN UP</button> */}
                </div>
                <div>
                  <button className="btn btn-main-md" onClick={register}>
                    Register
                  </button>
                  &nbsp;&nbsp;
                  {/* <button className="btn btn-main-md">SIGN UP</button> */}
                </div>
              </div>
              <div className="col-md-6 text-center order-1 order-md-2">
                <img className="img-fluid" src={Earth} alt="screenshot" />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="section pt-0 position-relative pull-top">
          <div className="container">
            <div className="rounded shadow p-5 bg-white">
              <div className="row">
                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                  <img
                    src={block}
                    alt="blockchain"
                    className="krdo_small ti-money text-warning h1"
                  />
                  <h3 className="mt-4 text-capitalize h5 ">Blockchain</h3>
                  <p className="regular text-muted">
                    A blockchain network were all the stakeholders have
                    transaction record of all transactions
                  </p>
                </div>
                <div className="col-lg-4 col-md-6 mt-5 mt-md-0 text-center">
                  <img
                    src={currency}
                    alt="currency"
                    className="krdo_small ti-money text-warning h1"
                  />
                  <h3 className="mt-4 text-capitalize h5 ">Microfinance</h3>
                  <p className="regular text-muted">
                    Helps consumers check farmer credibility and fund
                    accordingly
                  </p>
                </div>
                <div className="col-lg-4 col-md-12 mt-5 mt-lg-0 text-center">
                  <img
                    src={stock}
                    alt="currency"
                    className="krdo_small ti-money text-warning h1"
                  />
                  <h3 className="mt-4 text-capitalize h5 ">
                    ML based crop price prediction
                  </h3>
                  <p className="regular text-muted">
                    Helps farmers predict thier crop price based on recent
                    market trends and recommends what crops to produce and
                    fertilizers to use based on soil conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Farmers */}
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto align-self-center">
                <div className="feature-content">
                  <h2>Farmers</h2>
                  <p>
                    Farmers produce quality crops and negotiate better prices
                    throughout the supply chain and earn a fair price.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 mr-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Farmer} alt="ipad" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Farm Inspector */}
        <section className="feature section pt-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Quality} alt="iphone" />
                </div>
              </div>
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  <h2>Quality Checkers</h2>
                  <p className="desc">
                    Quality checkers inspect the quailty of yield and provide
                    certificate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Producers */}
        <section className="feature section pt-0" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  <h2>Producers</h2>
                  <p className="desc">
                    Producers buy the yield from farmers and process them to
                    produce food items which they further sell to Retailers.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 ml-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Producer} alt="iphone" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Retailers */}
        <section className="feature section pt-0" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Retailer} alt="iphone" />
                </div>
              </div>
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  <h2>Retailers</h2>
                  <p className="desc">
                    {" "}
                    Retailer are wholesalers who buy from Producers and sell to
                    consumers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consumers */}
        <section className="feature section pt-0" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  <h2>Consumers</h2>
                  <p className="desc">
                    Consumers can check for farmers credibility and can fund
                    individual crops or field and can acquire some yield from
                    farm or the profit percentage of market value
                  </p>
                </div>
              </div>
              <div className="col-lg-6 ml-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Consumer} alt="iphone" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Investors */}
        <section className="feature section pt-0" id="features">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 ml-auto justify-content-center">
                <div className="image-content">
                  <img className="img-fluid" src={Investor} alt="iphone" />
                </div>
              </div>
              <div className="col-lg-6 mr-auto align-self-center">
                <div className="feature-content">
                  <h2>Investors</h2>
                  <p className="desc">
                    Investors can invest in individual crops or field based on
                    the farmers credibility score and can acquire some gain from
                    the farm produce
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </div>
  );
}

export default Welcome;
