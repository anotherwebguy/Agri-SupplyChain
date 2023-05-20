import React, { useState } from "react";
import "../../css/nucleo-icons.css";
import "../../css/nucleo-svg.css";
import "../../css/bootstrap.css";
import "../../css/material-dashboard.css";
import Sidebar from "./Sidebar";
import "../../css/recommendation.css";
import { useNavigate } from "react-router-dom";
import axios from "../../django-ML-Api/axios";
import requests from "../../django-ML-Api/requests";
import SubNav from "../../utils/SubNav";

function Recommendation() {
  const [form1Data, setForm1Data] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [form2Data, setForm2Data] = useState({
    temperature: "",
    humidity: "",
    moisture: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
    soil_type: "select",
    crop_type: "select",
  });

  const arr = [];

  const handleChange1 = (e, changeKey = undefined) => {
    // console.log(changeKey, e.target.value)
    let newData = { ...form1Data };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setForm1Data(newData);
  };

  const handleChange2 = (e, changeKey = undefined) => {
    // console.log(changeKey, e.target.value)
    let newData = { ...form2Data };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setForm2Data(newData);
  };

  const handleClick1 = async () => {
    console.log("ander hoo");
    const request = new FormData();

    for (let key in form1Data) {
      console.log(key, form1Data[key]);
      request.append(key, form1Data[key]);
    }
    console.log(request);
    console.log(requests.cropApi);
    const response = await axios.post(requests.cropApi, request);
    console.log(response);
    const responseData = response.data;
    console.log(responseData);
    console.log("idr dhyan de");
    // arr = []
    console.log(responseData[0]);
    arr.push(responseData[0]);
    arr.push(responseData[1]);
    arr.push(responseData[2]);
    console.log(arr);
    resultPage();
  };

  const handleClick2 = async () => {
    const request2 = new FormData();

    for (let key in form2Data) {
      console.log(key, form2Data[key]);
      request2.append(key, form2Data[key]);
    }
    console.log(request2);
    console.log(requests.fertilizerAPi);
    const response = await axios.post(requests.fertilizerAPi, request2);
    console.log(response);
    const responseData = response.data;
    console.log(responseData);
    // arr = []
    arr.push(responseData[0]);
    arr.push(responseData[1]);
    arr.push(responseData[2]);
    console.log(arr);
    resultPage();
  };

  const navigate = useNavigate();

  const resultPage = () => {
    navigate("/farmer/recommendations/result", { state: { data: arr } });
  };

  return (
    <div className="home-body">
      <div className="left-body">
        <Sidebar rec="1"></Sidebar>
      </div>
      <div className="right-body">
        <SubNav heading="Recommendations"></SubNav>

        {/* Crop Recommendation Form */}

        <div className="recommendationform-body">
          <div className="left-container">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">question_answer</i>
                </div>
                <div className="text-end pt-1">
                  <h4 className="mb-0 text-info">Crop Recommender</h4>
                </div>
              </div>
              <div className="crop-body">
                <form action="" method="POST" name="form">
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="N"
                      name="N"
                      key="N"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="Amount of Nitrogen in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="P"
                      name="P"
                      key="P"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="Amount of Phosphorous in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="K"
                      name="K"
                      key="K"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="Amount of Postassium in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="temperature"
                      name="temperature"
                      key="temperature"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="Temperature (in Celcius)"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="humidity"
                      name="humidity"
                      key="humidity"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="Humidity (in %)"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="ph"
                      name="ph"
                      key="ph"
                      onChange={(e) => handleChange1(e)}
                      className="form-control"
                      placeholder="pH value of Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="rainfall"
                      key="rainfall"
                      onChange={(e) => handleChange1(e)}
                      name="rainfall"
                      className="form-control"
                      placeholder="Rainfall (in mm)"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      name="broadcastCrop"
                      onClick={() => handleClick1()}
                      className="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                    >
                      Predict Crop
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Fertiliser Recommendation Form */}

          <div className="right-container">
            <div className="card">
              <div className="card-header p-3 pt-2">
                <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                  <i className="material-icons opacity-10">question_answer</i>
                </div>
                <div className="text-end pt-1">
                  <h4 className="mb-0 text-info">Fertilizer Recommender</h4>
                </div>
              </div>
              <div className="fertiliser-body">
                <form action={() => handleClick2()} method="POST" name="form">
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="temperature"
                      name="temperature"
                      key="temperature"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Temperature (in Celcius)"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="humidity"
                      name="humidity"
                      key="humidity"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Humidity (in %)"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3 ">
                    <input
                      type="text"
                      id="moisture"
                      name="moisture"
                      key="moisture"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Moisture in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="nitrogen"
                      name="nitrogen"
                      key="nitrogen"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Amount of Nitrogen in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="potassium"
                      name="potassium"
                      key="potassium"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Amount of Postassium in Soil"
                    />
                  </div>
                  <div className="input-group input-group-outline mb-3">
                    <input
                      type="text"
                      id="phosphorus"
                      name="phosphorus"
                      key="phosphorus"
                      onChange={(e) => handleChange2(e)}
                      className="form-control"
                      placeholder="Amount of Phosphorous in Soil"
                    />
                  </div>
                  <select
                    id="soil_type"
                    name="soil_type"
                    onChange={(e) => handleChange2(e, "soil_type")}
                    className="form-select form-select-lg mb-3"
                  >
                    <option selected>Select Soil Type</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Clayey">Clayey</option>
                  </select>
                  <select
                    id="crop_type"
                    name="crop_type"
                    onChange={(e) => handleChange2(e, "crop_type")}
                    className="form-select form-select-lg mb-3 "
                  >
                    <option selected>Select Crop Type</option>
                    <option value="Maize">Maize</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Tobacco">Tobacco</option>
                    <option value="Paddy">Paddy</option>
                    <option value="Barley">Barley</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Millets">Millets</option>
                    <option value="Oil seeds">Oil seeds</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Ground Nuts">Ground Nuts</option>
                  </select>
                </form>
                <button
                  type="submit"
                  onClick={() => handleClick2()}
                  className="btn btn-lg bg-gradient-info btn-lg w-100 mt-4 mb-0"
                >
                  Predict Fertilizer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;
