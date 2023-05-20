import React from 'react'
import logo from '../images/verified.jpg'

function LeftAdminCard(props) {
    const { public_key, name, role, contact, address } = props

    return (
        <div className='timeline overflow-auto'>
            <div className='actions-left'>
                <div className='card-container-left'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='heading-row-left'>
                                <div className='heading-container-left'>
                                    <div>
                                        <h3>{role}</h3>
                                        <div className='d-flex'>
                                            <i className='material-icons pt-0.5 mr-1'>person</i>
                                            <span>{public_key}</span>
                                        </div>
                                    </div>
                                    {/* <div>
                                        <img className='header-image-left' src='https://www.imgonline.com.ua/examples/qr-code-url.png'></img>
                                    </div> */}
                                </div>
                                <div className='pt-3'>
                                    <p>Farmer Name : {name}<i className='fa fa-check pl-2'></i></p>
                                    <hr />
                                    <p>Farm Address : {address}<i className='fa fa-check pl-2'></i></p>
                                    <hr />
                                    <p>Contact Number : {contact}<i className='fa fa-check pl-2'></i></p>
                                    <img className='header-image2-left' src={logo}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className='left-icon' src='https://cdn-icons-png.flaticon.com/512/7595/7595571.png' height={80}></img>
            </div>
        </div>
    )
}

export default LeftAdminCard