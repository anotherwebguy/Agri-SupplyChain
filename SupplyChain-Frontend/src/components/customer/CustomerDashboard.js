import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SubNav from '../../utils/SubNav'
import CustomerSidebar from './CustomerSidebar'
import customer from '../../images/consumer.png'
import axios from 'axios';

function CustomerDashboard() {

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
        <CustomerSidebar dash='1'></CustomerSidebar>
      </div>
      <div className='right-body'>
        <SubNav heading='Dashboard'></SubNav>
        <section className="sectiona about-section gray-bga" id="about">
          <div className="container">
            <div className="row align-items-center flex-row-reverse">
              <div className="col-lg-7">
                <div className="about-text go-to">
                  <h3 className="dark-color">Hello, {result.name}!</h3>
                  <h6 className="theme-color lead"> Occupation: Customer</h6>
                  <p>I <mark>purchase</mark> end products and services. I may interact with the supply chain in a number of ways, such as by purchasing products directly from retailers or online marketplaces, by placing orders for custom-made products, or by requesting services from service providers.</p>
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
                  <img className='imga' src={customer} title="" alt="" />
                </div>
              </div>
            </div>
            {/* <div className="counter">
              <div className="row">
                <div className="col-6 col-lg-6">
                  <div className="count-data text-center">
                    <h6 className="count h2" data-to="500" data-speed="500">500</h6>
                    <p className="m-0px font-w-600">Successful Purchases</p>
                  </div>
                </div>
                <div className="col-6 col-lg-6">
                  <div className="count-data text-center">
                    <h6 className="count h2" data-to="150" data-speed="150">150</h6>
                    <p className="m-0px font-w-600">Pending Orders</p>
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

export default CustomerDashboard