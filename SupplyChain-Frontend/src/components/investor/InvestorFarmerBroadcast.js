import React from "react";
import SubNav from "../../utils/SubNav";
import FarmerInvestorCard from "./FarmerInvestorCard";
import InvestorSidebar from "./InvestorSidebar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "./Modal";
function InvestorFarmerBroadcast() {
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/loanRequest`).then((response) => {
      results = response.data;
      setResult(results);
      console.log(response.data);
    });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <FarmerInvestorCard
        user={d.user}
        crop_name={d.crop_name}
        quantity={d.quantity}
        price={d.exp_price}
        yield_date={d.yield_date}
      ></FarmerInvestorCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <InvestorSidebar farmb="1"></InvestorSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Farmer Broadcast"></SubNav>
        <div className="broadcast-body">
          <h3>Farmer Broadcasts!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list.length === 0 ? <p>No Farmer Broadcast yet...</p> : list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorFarmerBroadcast;
