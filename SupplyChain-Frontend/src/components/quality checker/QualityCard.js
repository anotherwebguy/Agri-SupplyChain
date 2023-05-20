import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { dbActions } from "../../store/dbSlice";
function QualityCard(props) {
  const { crop, lotId, farmerId, quantity, processor } = props;
  const [samples, setSamples] = useState();
  const [defect, setDefect] = useState();
  const [remarks, setRemarks] = useState("");
  const dispatch = useDispatch();

  const sample = async (e) => {
    setSamples(e.target.value);
  };
  const defective = async (e) => {
    setDefect(e.target.value);
  };
  const remark = async (e) => {
    setRemarks(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/qualityReport", {
        crop: crop,
        quantity: quantity,
        id: lotId,
        samples: samples,
        defect: defect,
        remarks: remarks,
      })
      .then((resp) => {
        alert(resp.data);
      });
    setSamples("");
    setDefect("");
    setRemarks("");
    dispatch(dbActions.reload());
  };
  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-6 mb-0 text-capitalize font-weight-bolder">
              {crop}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="quality-row ml-1">
          {/* <div className="card-footer p-2" >
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" >Farmer ID :</span>&nbsp;&nbsp;{farmerId}&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div> */}
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Lot ID :
              </span>
              &nbsp;&nbsp;{lotId}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quantity :
              </span>
              &nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          {/* <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Processor ID :
              </span>
              &nbsp;&nbsp;{processor}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div> */}
        </div>
        <div className="farmerproduct-body mt-1">
          <form onSubmit={submitHandler}>
            <div class="input-group input-group-outline mb-3">
              <input
                type="number"
                id="N"
                name="N"
                class="form-control"
                placeholder="Sample Size"
                required
                value={samples}
                onChange={sample}
              />
            </div>
            <div class="input-group input-group-outline mb-3">
              <input
                type="number"
                id="P"
                name="P"
                class="form-control"
                placeholder="Defective"
                required
                value={defect}
                onChange={defective}
              />
            </div>
            <div className="input-group input-group-outline mb-3">
              <input
                className="form-control"
                placeholder="Remarks"
                type="text"
                required
                value={remarks}
                onChange={remark}
              ></input>
            </div>
            <div class="text-center">
              <button
                type="submit"
                name="broadcastCrop"
                class="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
              >
                Push Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QualityCard;
