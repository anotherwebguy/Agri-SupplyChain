import React from "react";
import SubNav from "../../utils/SubNav";
import CustomerSidebar from "./CustomerSidebar";
import RetailerCard from "./RetailerCard";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function CustomerRetailerBroadcast() {
  // const data = [
  //     {product:'Wheat', price:1000, retailer:'Mohit', quantity:10}
  // ]

  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/reailerBrodcasts/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <RetailerCard
        product={d.product_name}
        price={d.price}
        retailer={d.retailer}
        quantity={d.quantity}
        crop_id={d.crop_id}
      ></RetailerCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <CustomerSidebar retailer="1"></CustomerSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Pending Payments"></SubNav>
        <div className="broadcast-body">
          <h3>Retailer Broadcasts!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerRetailerBroadcast;
