import React, { useState } from "react";
import "../css/Registration.css";
import block from "../images/logo-ct.png";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
function Registration() {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = useState("");
  const [name, setName] = useState("");
  const [no, setNo] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("farmer");
  const userAccountF = (e) => {
    setUserAccount(e.target.value);
  };
  const numberF = (e) => {
    setNo(e.target.value);
  };
  const nameF = (e) => {
    setName(e.target.value);
  };
  const addressF = (e) => {
    setAddress(e.target.value);
  };
  const roleF = (e) => {
    setRole(e.target.value);
  };
  const register = async (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/registration", {
      userAccount: userAccount,
      name: name,
      number: no,
      address: address,
      role: role,
    }).then((response) => {
      console.log(response.data);
      alert(response.data);
      navigate("/");
    });
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-white" href="#">
          <img
            src={block}
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
          &nbsp; Registration
        </a>
      </nav>
      <div className="countainer">
        <div className="card">
          <div className="card-header p-3 pt-2">
            <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
              <i className="material-icons opacity-10">question_answer</i>
            </div>
            <div className="text-end pt-1">
              <h4 className="mb-0 text-info">Registration</h4>
            </div>
          </div>
          <div className="fertiliser-body">
            <form onSubmit={register} name="form">
              <label className={"label-r"}> Account Address:</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  id="Acc-address"
                  name="Account Address"
                  className="form-control"
                  placeholder="0x237FFFe1beBA4Cd88E6b6e8f2b7aA55DC0556A21"
                  required
                  onChange={userAccountF}
                />
              </div>
              <label className={"label-r"}> Name:</label>
              <div className="input-group input-group-outline mb-3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Mohit"
                  required
                  onChange={nameF}
                />
              </div>
              <label className={"label-r"}> Contact No:</label>
              <div className="input-group input-group-outline mb-3 ">
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  placeholder="9823456732"
                  required
                  onChange={numberF}
                />
              </div>
              <label className={"label-r"}> Address:</label>
              <div className="input-group input-group-outline mb-3">
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="Enter your address here"
                  required
                  onChange={addressF}
                />
              </div>
              <label className={"label-r"}> Register as:</label>
              <select
                id="soil_type"
                name="soil_type"
                className="form-select form-select-lg mb-3"
                required
                onChange={roleF}
              >
                <option value="farmer" selected>
                  Farmer
                </option>
                <option value="processor">Processor</option>
                <option value="retailer">Retailer</option>
                <option value="consumer">Consumer</option>
                <option value="investor">Investor</option>
                <option value="qualitychecker">Quality Checker</option>
              </select>
              <p className="note">
                <span style={{ color: "tomato" }}> Note: </span>
                <br /> Make sure your account address and Phone number are
                correct. <br /> Admin might not approve your account if the
                provided Phone number does not matches the account address
                registered in admins catalogue.
              </p>
              <button
                type="submit"
                className="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
