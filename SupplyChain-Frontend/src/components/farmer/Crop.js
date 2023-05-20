import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart }            from 'react-chartjs-2'
import {Line} from 'react-chartjs-2';
import axios from '../../django-ML-Api/axios'
import requests from '../../django-ML-Api/requests'
import '../../css/crops.css'
import Sidebar from './Sidebar'
import SubNav from '../../utils/SubNav'
import '../../css/bootstrap.css'
import Forecast from './Forecast';

function Crop(props) {

    const location = useLocation();

    const [name, setName] = React.useState('')
    const [currentPrice, setCurrentPrice] = React.useState(0.0)
    const [max_crop, setMax_crop] = React.useState([])
    const [min_crop, setMin_crop] = React.useState([])
    const [forecast_values, setForecast_values] = React.useState([])
    const [forecast_x, setForecast_x] = React.useState([])
    const [forecast_y, setForecast_y] = React.useState([])
    const [previous_values, setPrevious_values] = React.useState([])
    const [previous_x, setPrevious_x] = React.useState([])
    const [previous_y, setPrevious_y] = React.useState([])
    const [image_url, setImage_url] = React.useState('')
    const [prime_location, setPrime_location] = React.useState('')
    const [type_crop, setType_crop] = React.useState('')
    const [export_crop, setExport_crop] = React.useState('')

    const postCommodity = async () => {
        const response = await axios.post(requests.predictionApi, {
            "name": location.state.name
        })
        console.log(name)
        console.log(response.data)
        setName(response.data.name)
        setCurrentPrice(response.data.current_price)
        setMax_crop(response.data.max_crop)
        setMin_crop(response.data.min_crop)
        setForecast_values(response.data.forecast_values)
        setForecast_x(response.data.forecast_x)
        setForecast_y(response.data.forecast_y)
        setPrevious_values(response.data.previous_values)
        setPrevious_x(response.data.previous_x)
        setPrevious_y(response.data.previous_y)
        setImage_url(response.data.image_url)
        setPrime_location(response.data.prime_loc)
        setType_crop(response.data.type_c)
        setExport_crop(response.data.export)
        console.log("idr dhyan de")
        console.log(name)
    }

    useEffect(() => {
        postCommodity();
    }, [location.state.name])

    const chart1 = {
        labels: forecast_x,
        datasets: [
          {
            label: 'price',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            // borderWidth: 2,
            data: forecast_y
          }
        ]
    }

    const chart2 = {
        labels: previous_x,
        datasets: [
          {
            label: 'price',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: previous_y
          }
        ]
    }

    
    if(name === '' || currentPrice === 0.0 || max_crop.length === 0){
        return <div>Loading...</div>
    }
    return (
        <div className='home-body'>
            {/* <div className='left-body'>
                <Sidebar pred="1"></Sidebar>
            </div> */}
            <div className='right-body'>
                <SubNav heading={name}></SubNav>

                <div className="main">
                    <br/>
                    <div className="row justify-content-space-between">
                        <div className="col-7">
                            <div className="card">
                                <div className="card-header p-3 pt-2">
                                    <div
                                        className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                        <i className="material-icons opacity-10">agriculture</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <h4 className="mb-0 text-info">{name}</h4>
                                    </div>
                                </div>
                                <div className='row justify-content-between'>
                                    <div className='col-5'>
                                        <div className="">
                                            <img className="chota-kro" src={image_url}/>
                                        </div>
                                    </div>
                                    <div className='col-7'>
                                        <div className="card-content">
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5>Current Price:</h5>
                                                </div>
                                                <div className="col-6">
                                                    <h5>₹ {currentPrice} / ql</h5>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5>Prime Location:</h5>
                                                </div>
                                                <div className="col-6">
                                                    <h5>{prime_location}</h5>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5>Crop Type:</h5>
                                                </div>
                                                <div className="col-6">
                                                    <h5>{type_crop}</h5>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-6">
                                                    <h5>Export:</h5>
                                                </div>
                                                <div className="col-6">
                                                    <h5>{export_crop}</h5>
                                                </div>
                                            </div>
                                            <hr/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header p-3 pt-2">
                                    <div
                                        className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                                        <i className="material-icons opacity-10">plants</i>
                                    </div>
                                    <div className="text-end pt-1">
                                        <h4 className="mb-0 text-info">Brief Forcast</h4>
                                    </div>
                                </div>
                                <br/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-5">
                                            <h5>Max Crop Price time:</h5>
                                        </div>
                                        <div className="col-3">
                                            <h5>{max_crop[0]}</h5>
                                        </div>
                                        <div className="col-4">
                                            <h5>₹ {max_crop[1]}</h5>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-5">
                                            <h5>Min Crop Price time:</h5>
                                        </div>
                                        <div className="col-3">
                                            <h5>{min_crop[0]}</h5>
                                        </div>
                                        <div className="col-4">
                                            <h5>₹ {min_crop[1]}</h5>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-5">
                        <Forecast obj={forecast_values} />
                    </div>
                    <div className="col-7">
                        <div className="container-chart">
                            <h5>Next year Price forecast</h5>
                            <Line
                                data={chart1}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            stacked: false,
                                            gridLines: {
                                            drawBorder: false,
                                            display: false,
                                            },
                                            ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 13,
                                            },
                                        },
                                        y: {
                                            stacked: true,
                                            gridLines: {
                                            color: '#e6e6e6',
                                            drawBorder: false,
                                            },
                                            },
                                    },
                                    title:{
                                        display:true,
                                        text:'Next year Price forecast',
                                        fontSize:20
                                    },
                                }}
                            />
                        </div>
                        <br/>
                        <br/>
                        <div className="container-chart">
                            <h5>Previous year Price</h5>
                            <Line
                                data={chart2}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            stacked: false,
                                            gridLines: {
                                            drawBorder: false,
                                            display: false,
                                            },
                                            ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 13,
                                            },
                                        },
                                        y: {
                                            stacked: true,
                                            gridLines: {
                                            color: '#e6e6e6',
                                            drawBorder: false,
                                            },
                                            },
                                    },
                                    title:{
                                        display:true,
                                        text:'Previous year Price',
                                        fontSize:20
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Crop
