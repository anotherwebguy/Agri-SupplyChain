import React, { useEffect, useState } from 'react'
import '../../css/homestyle.css'
import '../../css/nucleo-icons.css'
import '../../css/nucleo-svg.css'
import '../../css/bootstrap.css'
import '../../css/material-dashboard.css'
import farmer from '../../images/farmer.png'
import Sidebar from './Sidebar'
import SubNav from '../../utils/SubNav'
import { useSelector } from 'react-redux'
import '../../css/farmerDashboard.css'
import axios from 'axios'

function Dashboard() {

    const id = useSelector((state) => state.db.userAcc);
    const [result, setResult] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then((response) => {
                setResult(response.data[0]);
            })
    })

    return (
        <div className='home-body'>
            <div className='left-body'>
                <Sidebar dash="1"></Sidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Dashboard'></SubNav>
                <section className="sectiona about-section gray-bga" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-7">
                                <div className="about-text go-to">
                                    <h3 className="dark-color">Hello, {result['name']}!</h3>
                                    <h6 className="theme-color lead"> Occupation: Farmer</h6>
                                    <p>I <mark>produce</mark> the raw materials needed to create a wide range of products. I manage all activities like growing, harvesting crops, raising livestocks etc. by myself. I use good quality fertilisers and proper techniques to grow crops.</p>
                                    <div className="row about-list">
                                        <div className="col-md-5">
                                            <div className="media">
                                                <label>Name</label>
                                                <p>{result.name}</p>
                                            </div>
                                            <div className="media">
                                                <label>Address</label>
                                                <p>{result.address}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="media">
                                                <label>Account</label>
                                                <p>{result.public_key}</p>
                                            </div>
                                            <div className="media">
                                                <label>Phone</label>
                                                <p>{result.number}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="about-avatar">
                                    <img className='imga' src={farmer} title="" alt="" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="counter">
                            <div className="row">
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                                        <p className="m-0px font-w-600">Yield BroadCasts</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                                        <p className="m-0px font-w-600">Processor Requests</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="850" data-speed="850">850</h6>
                                        <p className="m-0px font-w-600">Investor Deals</p>
                                    </div>
                                </div>
                                <div className="col-6 col-lg-3">
                                    <div className="count-data text-center">
                                        <h6 className="count h2" data-to="190" data-speed="190">190</h6>
                                        <p className="m-0px font-w-600">Accepted Deals</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Dashboard