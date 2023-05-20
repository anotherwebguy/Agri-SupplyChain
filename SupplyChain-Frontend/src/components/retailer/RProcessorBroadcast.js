import React from "react";
import SubNav from "../../utils/SubNav";
import RetailerSidebar from "./RetailerSidebar";
import RProcessorCard from "./RProcessorCard";
import axios from "axios";

import { useSelector } from "react-redux";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { dbActions } from "../../store/dbSlice";
function RProcessorBroadcast() {
  const id = useSelector((state) => state.db.userAcc);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/retailerBrodcast`).then((response) => {
      results = response.data;
      setResult(results);
    });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <RProcessorCard
        product={d.product_name}
        price={d.price}
        available={d.quantity}
        id={d.crop_id}
        seller={d.processor}
      ></RProcessorCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <RetailerSidebar processorbroadcast="1"></RetailerSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Processor Broadcast"></SubNav>
        <div className="broadcast-body">
          <h3>Processor Broadcasts!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RProcessorBroadcast;
