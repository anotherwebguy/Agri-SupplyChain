import React from "react";
import SubNav from "../../utils/SubNav";
import InvestmentDealCard from "./InvestmentDealCard";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function InvestorDeals() {
  const [result, setResult] = useState([]);

  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;

  useEffect(() => {
    axios
      .get(`http://localhost:3001/investorRequests/${id}`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <InvestmentDealCard
        crop={d.crop_name}
        quantity={d.quantity}
        price={d.exp_price}
        date={d.yield_date}
        amount={d.amount}
        share={d.holding}
      />
    );
  });
  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar investor="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Investor Deals"></SubNav>
        <div className="broadcast-body">
          <h3>Investor Deals</h3>
          <div className="container-fluid py-4">
            <div className="row">{list.length === 0 ? <p>No Investor Deals yet...</p> : list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorDeals;
