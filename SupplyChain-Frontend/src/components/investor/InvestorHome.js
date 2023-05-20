import React, { useEffect, useState } from 'react'
import '../../css/investor.css'
import SubNav from '../../utils/SubNav'
import InvestorSidebar from './InvestorSidebar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import investor from '../../images/investor.png'

function InvestorHome() {

    const id = useSelector((state) => state.db.userAcc);
    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then((response) => {
                setResult(response.data[0]);
            })
    })

    return (
        <div className='home-body'>
            <div className='left-body'>
                <InvestorSidebar dash='1'></InvestorSidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Dashboard'></SubNav>
                <section className="sectiona about-section gray-bga" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-7">
                                <div className="about-text go-to">
                                    <h3 className="dark-color">Hello, {result.name}</h3>
                                    <h6 className="theme-color lead"> Occupation: Investor</h6>
                                    <p>I <mark>finance</mark> the production and distribution of goods. In addition to providing financial support, I play an important role in shaping the direction and strategy of the companies they invest in. For example, I offer guidance and support to help companies develop new products or enter new markets.</p>
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
                                                <span>{id}</span>
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
                                    <img className='imga' src={investor} title="" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default InvestorHome