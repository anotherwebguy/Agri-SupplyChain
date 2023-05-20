import React from "react";
import SubNav from "../../utils/SubNav";
import CustomerSidebar from "./CustomerSidebar";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function PreviousPurchases() {
  //   const data = [
  //     {
  //       item: "Wheat",
  //       price: 200,
  //       quantity: 20,
  //       retailer: "133j34k",
  //       transaction: "123kl3",
  //     },
  //     {
  //       item: "Wheat",
  //       price: 200,
  //       quantity: 20,
  //       retailer: "133j34k",
  //       transaction: "123kl3",
  //     },
  //     {
  //       item: "Wheat",
  //       price: 200,
  //       quantity: 20,
  //       retailer: "133j34k",
  //       transaction: "123kl3",
  //     },
  //     {
  //       item: "Wheat",
  //       price: 200,
  //       quantity: 20,
  //       retailer: "133j34k",
  //       transaction: "123kl3",
  //     },
  //   ];
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/previousPurchases/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <tr>
        <td>
          <div className="d-flex px-2 py-1">
            <div>
              <i className="material-icons opacity-10">shopping_cart</i>
            </div>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-0 text-sm">{d.product_name}</h5>
            </div>
          </div>
        </td>
        <td>
          <h5 className="mb-0 text-sm">{d.seller}</h5>
        </td>
        <td>
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-0 text-sm">{d.id}</h5>
            </div>
          </div>
        </td>

        <td>
          <p className="text-xs font-weight-bold mb-0">₹ {d.price}</p>
        </td>
        <td className="align-middle text-center text-sm">
          <h6 className="mb-0 text-sm">{d.quantity}</h6>
        </td>
      </tr>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <CustomerSidebar prevpurchase="1"></CustomerSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Previous Purchases"></SubNav>
        <br></br>
        <div className="gainers-body">
          <div className="container-fluid py-0">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-info shadow-success border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">
                        History
                      </h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                      <table className="table align-items-center mb-0">
                        <thead>
                          <tr>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Item Name
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              {" "}
                              Retailer ID
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              {" "}
                              Transaction ID
                            </th>
                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                              {" "}
                              Price
                            </th>
                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                              Quantity
                            </th>
                          </tr>
                        </thead>
                        <tbody>{list}</tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviousPurchases;
