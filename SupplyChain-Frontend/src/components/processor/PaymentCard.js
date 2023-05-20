import React, { useEffect, useState } from "react";
import axios from "axios";
import Payment from "../../../src/artifacts/contracts/Payment.sol/Payment.json";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { dbActions } from "../../store/dbSlice";

function PaymentCard(props) {
  const { name, eprice, requestedQuantity, qprice, lotId, crop_name } = props;
  const [result, setResult] = useState("");
  const [d, setD] = useState(false);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const paymentAddress = useSelector((state) => state.db.address);
  const id = useSelector((state) => state.db.userAcc);

  let results;
  let defective;
  let sample_size;
  let total_rating_count;
  let credit_score;
  useEffect(() => {
    axios
      .get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=INR,")
      .then((response) => {
        setPrice(response.data.INR);
      });
  }, [price]);
  const creditScore = async (e) => {
    await axios
      .get(`http://localhost:3001/reportScore/${lotId}`)
      .then((response) => {
        results = response.data;
        console.log(results);
        sample_size = results[0].sample_size;
        defective = results[0].defective;
      });
    await axios
      .get(`http://localhost:3001/ratingScore/${name}`)
      .then((response) => {
        results = response.data;
        console.log(results);
        total_rating_count = results[0].total_rating_count;
        credit_score = results[0].credit_score;
      });
    const a = await calculate(
      defective,
      sample_size,
      total_rating_count,
      credit_score
    );
    console.log(a);
    await axios
      .put(`http://localhost:3001/creditUpdate/${name}`, {
        trc: total_rating_count,
        cs: a,
      })
      .then((resp) => {
        alert(resp.data);
      });
  };
  const calculate = async (
    defective,
    sample_size,
    total_rating_count,
    credit_score
  ) => {
    const score =
      5 * (defective / sample_size) +
      (total_rating_count / total_rating_count + 1) * credit_score;
    return score;
  };

  const payment = async (e) => {
    // pay karo

    const fin = qprice / price;
    // const fin2 = ethers.utils.parseEther(`${fin}`.toString());
    console.log(fin);
    const fin2 = Number(fin).toFixed(18);
    if (typeof window.ethereum !== "undefined" && id != "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = {
        from: id,
        to: name,
        value: ethers.utils.parseEther(`${fin2}`),
      };
      await signer.sendTransaction(tx).then((transaction) => {
        console.dir(transaction);
        alert("Payment Done!");
      });

      const contract = new ethers.Contract(paymentAddress, Payment.abi, signer);

      const data = await contract.updateStatus(lotId);
      await axios
        .post(`http://localhost:3001/paid`, {
          crop_name: crop_name,
          qprice: qprice,
          lotId: lotId,
          buyer: id,
          seller: name,
          quantity: requestedQuantity,
        })
        .then((resp) => {
          console.log(resp.data);
        });
      await creditScore();
      dispatch(dbActions.reload());
    }
  };

  const showReport = async () => {
    await axios
      .get(`http://localhost:3001/report/${lotId}`)
      .then((response) => {
        results = response.data;
        setResult(results);

        alert(
          `Lot id - ${response.data[0].crop_id}, sample size - ${response.data[0].sample_size}, Defective - ${response.data[0].defective}, Remark - ${response.data[0].remark}`
        );
        // alert(`sample size - ${response.data[0].sample_size}`);
        // alert(`Defective - ${response.data[0].defective}`);
        // alert(`Remark - ${response.data[0].remark}`);
      });
  };
  return (
    <div className="col-3 mb-xl-5 mb-4">
      <div className="card">
        <div className="card-header p-3 pt-2">
          <div className="text-end pt-1">
            <p className="display-7 mb-0 text-capitalize font-weight-bolder">
              {name}
            </p>
          </div>
        </div>
        {/* <hr className="dark horizontal my-0"></hr> */}
        <div className="row">
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
                Name :
              </span>
              &nbsp;&nbsp;{crop_name}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Expected Price :
              </span>
              &nbsp;&nbsp;₹{eprice}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quantity :
              </span>
              &nbsp;&nbsp;{requestedQuantity}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div className="card-footer p-2">
            <p className="mb-0">
              <span className="text-success text-sm font-weight-bolder">
                Quoted Price :
              </span>
              &nbsp;&nbsp;₹{qprice}&nbsp;&nbsp;&nbsp;&nbsp;
            </p>
          </div>
          <div class="text-center mb-1">
            <button
              type="click"
              name="broadcastCrop"
              class="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0"
              onClick={payment}
            >
              Pay ₹{qprice}
            </button>
          </div>
          <div class="text-center mb-1">
            <button
              type="click"
              name="broadcastCrop"
              class="btn btn-lg bg-gradient-info btn-lg w-100 mt-2 mb-0"
              onClick={showReport}
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentCard;
