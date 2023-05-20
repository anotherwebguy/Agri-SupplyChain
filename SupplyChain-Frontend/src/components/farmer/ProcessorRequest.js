import React from "react";
import SubNav from "../../utils/SubNav";
import ProcessorRequestCard from "./ProcessorRequestCard";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ProcessorRequest() {
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/processorBids/${id}`).then((response) => {
      results = response.data;
      setResult(results);
      console.log(response.data);
    });
  }, [reload]);
  // const data = [
  //     {crop:'wheat', processor:'Mohit', quantity:5, price: 1000},
  //     {crop:'wheat', processor:'Mohit', quantity:5, price: 1000},
  //     {crop:'wheat', processor:'Mohit', quantity:5, price: 1000},
  //     {crop:'wheat', processor:'Mohit', quantity:5, price: 1000},
  //     {crop:'wheat', processor:'Mohit', quantity:5, price: 1000},
  // ]

  const list = result.map((d) => {
    return (
      <ProcessorRequestCard
        crop={d.crop_name}
        processor={d.buyer}
        rquantity={d.quantity}
        qprice={d.bid_price}
        id={d.id}
        crop_id={d.crop_id}
      ></ProcessorRequestCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar proreq="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Processor Request"></SubNav>
        <div className="broadcast-body">
          <h3>Your Processor Requests!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list.length === 0 ? <p>No processor request yet...</p> : list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessorRequest;
