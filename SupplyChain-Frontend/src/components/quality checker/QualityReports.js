import React from "react";
import QualitySidebar from "./QualitySidebar";
import SubNav from "../../utils/SubNav";
import QualityCard from "./QualityCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function QualityReports() {
  // const data=[
  //     {crop:'wheat', farmerId:190, lotId: 200, quantity: 100, processor:'19392hikk2'},
  //     {crop:'wheat', farmerId:190, lotId: 200, quantity: 100, processor:'19392hikk2'},
  //     {crop:'wheat', farmerId:190, lotId: 200, quantity: 100, processor:'19392hikk2'},
  //     {crop:'wheat', farmerId:190, lotId: 200, quantity: 100, processor:'19392hikk2'},
  //     {crop:'wheat', farmerId:190, lotId: 200, quantity: 100, processor:'19392hikk2'},
  // ]
  const [result, setResult] = useState([]);
  const id = useSelector((state) => state.db.userAcc);
  const reload = useSelector((state) => state.db.reload);
  let results;
  useEffect(() => {
    axios.get(`http://localhost:3001/qualityC`).then((response) => {
      results = response.data;
      setResult(results);
      console.log(response.data);
    });
  }, [reload]);
  const list = result.map((d) => {
    return (
      <QualityCard
        crop={d.name}
        lotId={d.crop_id}
        quantity={d.quantity}
        processor="0x424e05000DFeC893AA9A5840FAa0dDa57f36D1eb"
      />
    );
  });

  return (
    <div className="home-body">
      <div className="right-body">
        <h3>Quality Reports!</h3>
        <div className="container-fluid py-4">
          <div className="row">{list}</div>
        </div>
      </div>
    </div>
  );
}

export default QualityReports;
