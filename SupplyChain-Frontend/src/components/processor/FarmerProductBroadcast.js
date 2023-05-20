import React from "react";
import SubNav from "../../utils/SubNav";
import FarmerBroadcastCard from "./FarmerBroadcastCard";
import ProcessorSidebar from "./ProcessorSidebar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function FarmerProductBroadcast() {
  const [result, setResult] = useState([]);

  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios
      .get(`http://localhost:3001/farmerbrodcastcallprocessor`)
      .then((response) => {
        results = response.data;
        setResult(results);
        console.log(response.data);
      });
  }, [reload]);

  const list = result.map((d) => {
    return (
      <FarmerBroadcastCard
        crop={d.crop}
        name={d.public_key}
        price={d.price}
        quantity={d.quantity}
        id={d.id}
      ></FarmerBroadcastCard>
    );
  });

  return (
    <div className="home-body">
      <div className="left-body">
        <ProcessorSidebar fbroad="1"></ProcessorSidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Farmer Broadcasts"></SubNav>
        <div className="broadcast-body">
          <h3>Farmer Broadcasts!</h3>
          <div className="container-fluid py-4">
            <div className="row">{list}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerProductBroadcast;
