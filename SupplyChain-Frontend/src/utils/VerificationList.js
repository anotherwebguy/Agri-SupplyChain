import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/bootstrap.css";
import "../css/verification.css";
import { dbActions } from "../store/dbSlice";

function VerificationList() {
  const [result, setResult] = useState([]);
  const reload = useSelector((state) => state.db.reload);
  const dispatch = useDispatch();
  let results;
  useEffect(() => {
    axios.get("http://localhost:3001/verify").then((response) => {
      results = response.data;
      setResult(results);
    });
  }, [reload]);
  const approve = async (e) => {
    const id = e.target.value;

    axios.put(`http://localhost:3001/approve/${id}`).then((res) => {
      alert(res.data);
      dispatch(dbActions.reload());
    });
  };
  const reject = async (e) => {
    const id = e.target.value;

    axios.delete(`http://localhost:3001/reject/${id}`).then((res) => {
      alert(res.data);
      dispatch(dbActions.reload());
    });
  };
  return (
    <React.Fragment>
      <div class="alerty alerty-warning text-center" role="alert">
        Total registeration requests: {result.length}
      </div>
      {result.map((r) => {
        return (
          <div key={r.id}>
            <div className="cardy sizi">
              <div className="cardy-header">
                <table>
                  <tr>
                    <th>Account address:</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{r.public_key}</td>
                  </tr>
                </table>
              </div>
              <div className="cardy-body">
                <table>
                  <tr>
                    <th>Name:</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{r.name}</td>
                  </tr>
                  <tr>
                    <th>Contact No:</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{r.number}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{r.address}</td>
                  </tr>
                  <tr>
                    <th>Role:</th>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <td>{r.role}</td>
                  </tr>
                </table>
              </div>
              <div className="cardy-footer text-muted text-center">
                <button
                  type="button "
                  className="btn btn-success siza"
                  value={r.id}
                  onClick={approve}
                >
                  Approve
                </button>

                <button
                  type="button "
                  className="btn btn-danger siza"
                  value={r.id}
                  onClick={reject}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default VerificationList;
