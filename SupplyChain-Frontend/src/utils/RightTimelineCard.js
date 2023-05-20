import React from 'react'
import '../css/right-timeline.css'
import logo from '../images/verified.jpg'

function RightTimelineCard(props) {

    const { public_key, name, role, contact, address } = props

    return (
        <div className='timeline overflow-auto'>
            <div className='container-right'>
                <img className='right-icon' src='https://cdn-icons-png.flaticon.com/512/7595/7595571.png' height={80}></img>
                <div className='card-container-right'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='heading-row-right'>
                                <div className='heading-container-right'>
                                    <div>
                                        <h3>{role}</h3>
                                        <div className='d-flex'>
                                            <i className='material-icons pt-0.5 mr-1'>person</i>
                                            <span >{public_key}</span>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <img className='header-image-right' src='https://www.imgonline.com.ua/examples/qr-code-url.png'></img>
                                    </div> */}
                                </div>
                                <div className='pt-3'>
                                    <p>Farmer Name : {name}<i className='fa fa-check pl-2'></i></p>
                                    <hr />
                                    <p>Address : {address}<i className='fa fa-check pl-2'></i></p>
                                    <hr />
                                    <p>Contact Number : {contact}<i className='fa fa-check pl-2'></i></p>
                                    <img className='header-image2-right' src={logo}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightTimelineCard