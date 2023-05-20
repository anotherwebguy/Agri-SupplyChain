import React from "react";
import SubNav from "../../utils/SubNav";
import InvestorPaymentCard from "./InvestorPaymentCard";
import InvestorSidebar from "./InvestorSidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
function InvestorPayments() {
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/requestPendingPayments`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <InvestorPaymentCard
        quantity={d.quantity}
        farmerId={d.user}
        crop={d.crop_name}
        price={d.exp_price}
        amount={d.amount}
        share={d.holding}
        yieldId={d.yield_date}
      ></InvestorPaymentCard>
    );
  });
  return (
    <div className="home-body">
      <div className="left-body">
        <InvestorSidebar payment="1"></InvestorSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Pending Payments"></SubNav>
        <div className="broadcast-body">
          <h3>Pending Payments!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list.length === 0 ? <p>No Pending Payments yet...</p> : list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorPayments;
