import React from "react";
import Sidebar from "./Sidebar";
import SubNav from "../../utils/SubNav";
import AcceptedDealCard from "./AcceptedDealCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function AcceptedDeals() {
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/orders/${id}`).then((response) => {
      results = response.data;
      setResult(results);
      console.log(response.data);
    });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <AcceptedDealCard
        crop={d.crop_name}
        lotId={d.crop_id}
        price={d.price}
        buyer={d.buyer}
      />
    );
  });
  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar accepted="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Accepted Deals"></SubNav>
        <div className="broadcast-body">
          <h3>Accepted Deals</h3>
          <div className="container-fluid py-4">
            <div className="row"></div>
            {list}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptedDeals;
