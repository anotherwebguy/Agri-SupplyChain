import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SubNav from '../../utils/SubNav'
import Sidebar from './Sidebar'

function Transaction() {

    const address = useSelector((state) => state.db.userAcc);
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/history/${address}`)
            .then((response) => {
                setResult(response.data);
            });
    });

    const list = result.map((d) => {
        return (
            <tr>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div>
                            <i className="material-icons opacity-10">grass</i>
                        </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="d-flex flex-column justify-content-center">
                            <h5 className="mb-0 text-sm text-center">{d.crop_name}</h5>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex px-12 py-1">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="d-flex flex-column justify-content-center">
                            <h5 className="ml-2 text-sm">{d.buyer}</h5>
                        </div>
                    </div>
                </td>
                <td>
                    <p className="text-xs font-weight-bold mb-0">₹ {d.price}</p>
                </td>
                <td className="align-middle text-center text-sm">
                    <h6 className="mb-0 text-sm">{d.quantity}</h6>
                </td>
            </tr>
        )
    })

    return (
        <div className='home-body'>
            <div className='left-body'>
                <Sidebar trans='1'></Sidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Transactions'></SubNav>
                <br></br>
                <div className='gainers-body'>
                    <div className="container-fluid py-0">
                        <div className="row">
                            <div className="col-12">
                                <div className="card my-4">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
                                            <h6 className="text-white text-capitalize ps-3">Transactions</h6>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th
                                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Crop</th>
                                                        <th
                                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Buyer</th>
                                                        <th
                                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price</th>
                                                        <th
                                                            className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                                            Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        list
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transaction