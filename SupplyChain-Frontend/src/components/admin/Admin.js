import React, { useEffect, useState } from "react";
import "../../css/bootstrap.css";
import "../../css/admin.css";
import block from "../../images/logo-ct.png";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ethers } from "ethers";
import Payment from '../../../src/artifacts/contracts/Payment.sol/Payment.json';

function Admin() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const paymentAddress = useSelector((state) => state.db.address);
  const [result, setResult] = useState([]);
  const [test, setTest] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/countofusers`)
      .then((response) => {
        setCount(response.data[0].count);
      })
  }, [count]);

  useEffect(() => {
    axios.get(`http://localhost:3001/getAllCrops`)
      .then((response) => {
        setResult(response.data);
        getTrackingStatus()
      })
  }, [result])

  const clickHandler = (a) => {
    navigate('/admin/status', { state: { data: [a] } })
  }

  const getTrackingStatus = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(
      paymentAddress,
      Payment.abi,
      provider
    );
    let arr = []
    for (let i in result) {
      // console.log(i);
      const data = await contract.getStatus(result[i].id);
      const num = parseInt(data._hex, 16);
      arr.push({
        id: result[i].id,
        val: num
      });
    }
    setTest(arr);
  }


  const list = test.map((ele) => {
    let a = ele.id;
    let b = ele.val;
    return (
      <tr>
        <td className="text-center">{a}</td>
        <td className="text-center">
          <span className={b === 0 ? 'badge bg-warning' : 'badge bg-success'}>
            {b === 0 ? 'Processing' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 1 ? 'badge bg-warning' : b < 1 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 1 ? 'Processing' : b < 1 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 2 ? 'badge bg-warning' : b < 2 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 2 ? 'Processing' : b < 2 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 3 ? 'badge bg-warning' : b < 3 ? 'badge bg-danger' : 'badge bg-success'}>
            {b === 3 ? 'Processing' : b < 3 ? 'Not Available' : 'Completed'}
          </span>
        </td>
        <td className="text-center">
          <span className={b === 4 ? 'badge bg-success' : 'badge bg-danger'}>
            {b === 4 ? 'Sold' : 'Not Sold'}
          </span>
        </td>
        <td className="text-center">
          <button onClick={() => clickHandler(a)}
            className="btn btn-simple btn-info btn-icon like"
          >
            <i className="material-icons">visibility</i>
          </button>
        </td>
      </tr >
    );
  });

  return (
    <div>
      {/* navbar to display admin dashboard */}
      <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
        <img
          src={block}
          width="30"
          height="30"
          class="d-inline-block align-top"
          alt=""
        />
        &nbsp;&nbsp;
        <a className="navbar-brand" href="/admin">
          <h5>Admin panel</h5>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/admin/verification">
                <h1>Verification</h1>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* navbar ends */}

      {/* 3 cards in a row to display total users, total roles and total batches */}
      <div className="container-fluid spaci">
        <div className="row">
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="orange">
                <h2 className="category">Total Users</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-blue">person</i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">{count}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="green">
                <h2 className="category">Total Roles</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-green">school</i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">6</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-track choti">
              <div className="card-header moti" data-background-color="red">
                <h2 className="category">Total Batches</h2>
                <hr />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col-md-4 badal">
                    <i className="material-icons badal icon-purple">
                      description
                    </i>
                  </div>
                  <div className="col-md-6 text-right bajul">
                    <h1 className="title">1</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid tabla">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div
                className="card-header card-header-icon koti"
                data-background-color="rose"
              >
                <h2>Products OVERVIEW</h2>
              </div>
              <div className="card-content">
                <div className="material-datatables">
                  <table
                    id="datatables"
                    className="table table-striped table-no-bordered table-hover"
                    cellSpacing="0"
                    width="100%"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th className="text-center">Product Id</th>
                        <th className="text-center">Broadcast</th>
                        <th className="text-center">Farm Inspection</th>
                        <th className="text-center">Processor</th>
                        <th className="text-center">Retailer</th>
                        <th className="text-center">Consumer</th>
                        <th className="disabled-sorting text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {list}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Admin;
