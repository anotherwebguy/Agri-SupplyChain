import React from "react";
import InterestCard from "../../utils/InterestCard";
import PaymentCard from "./PaymentCard";
import SubNav from "../../utils/SubNav";
import ProcessorSidebar from "./ProcessorSidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function PendingPayments() {
  // const data = [
  //   {name:'Mohit', eprice:2000, requestedQuantity:10, qprice:1000, lotId:'123hfk'},
  //   {name:'Mohit', eprice:2000, requestedQuantity:10, qprice:1000, lotId:'123hfk'},
  //   {name:'Mohit', eprice:2000, requestedQuantity:10, qprice:1000, lotId:'123hfk'},
  //   {name:'Mohit', eprice:2000, requestedQuantity:10, qprice:1000, lotId:'123hfk'},
  //   {name:'Mohit', eprice:2000, requestedQuantity:10, qprice:1000, lotId:'123hfk'},
  // ]
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/pendingPayments/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <PaymentCard
        name={d.seller}
        eprice={d.price}
        requestedQuantity={d.quantity}
        lotId={d.crop_id}
        qprice={d.bid_price}
        crop_name={d.crop_name}
      ></PaymentCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <ProcessorSidebar ppayment="1"></ProcessorSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Pending Payments"></SubNav>
        <div className="broadcast-body">
          <h3>Pending Payments</h3>
          <div className="container-fluid py-4">
            <div className="row">{list.length === 0 ? <p>No Pending Payments yet...</p> : list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingPayments;
