import React from 'react'
import '../../css/nucleo-icons.css'
import '../../css/nucleo-svg.css'
import '../../css/bootstrap.css'
import '../../css/material-dashboard.css'
import '../../css/prediction.css'
import {useNavigate} from 'react-router-dom'

function Commodity() {

    // const [name, setName] = React.useState('')
    // const [currentPrice, setCurrentPrice] = React.useState(0.0)
    // const [max_crop, setMax_crop] = React.useState([])
    // const [min_crop, setMin_crop] = React.useState([])
    // const [forecast_values, setForecast_values] = React.useState([])
    // const [forecast_x, setForecast_x] = React.useState([])
    // const [forecast_y, setForecast_y] = React.useState([])
    // const [previous_values, setPrevious_values] = React.useState([])
    // const [previous_x, setPrevious_x] = React.useState([])
    // const [previous_y, setPrevious_y] = React.useState([])
    // const [image_url, setImage_url] = React.useState('')
    // const [prime_location, setPrime_location] = React.useState('')
    // const [type_crop, setType_crop] = React.useState('')
    // const [export_crop, setExport_crop] = React.useState('')

    // const postCommodity = async (str) => {
    //     const response = await axios.post(requests.predictionApi, {
    //         "name": str
    //     })
    //     console.log(name)
    //     console.log(response.data)
    //     setName(response.data.name)
    //     setCurrentPrice(response.data.current_price)
    //     setMax_crop(response.data.max_crop)
    //     setMin_crop(response.data.min_crop)
    //     setForecast_values(response.data.forecast_values)
    //     setForecast_x(response.data.forecast_x)
    //     setForecast_y(response.data.forecast_y)
    //     setPrevious_values(response.data.previous_values)
    //     setPrevious_x(response.data.previous_x)
    //     setPrevious_y(response.data.previous_y)
    //     setImage_url(response.data.image_url)
    //     setPrime_location(response.data.prime_loc)
    //     setType_crop(response.data.type_c)
    //     setExport_crop(response.data.export)
    //     console.log("idr dhyan de")
    //     console.log(name)
    //     resultPage();
    // }

    const navigate = useNavigate()

    const resultPage = (str)=>{
        navigate('/farmer/predictions/commodity',{state:{name:str}});
    }

    return (
        <div className='commodity-body'>
            <h3>Explore By Commodity</h3>
            <br />
            <div className='comm-container'>
                <div className='row'>
                    <div className='comm-card' onClick={()=>resultPage("paddy")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/rice-bowl.png" />
                            </div>
                            <h3 className="comm-title"><span className="comm-title">Paddy</span></h3>
                        </div>
                        <div className='comm-bar'>
                            <div className='comm-emptybar'></div>
                            <div className='comm-filledbar'></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("wheat")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/wheat.png" />
                            </div>
                            <h3 className="comm-title"><span className="comm-title">Wheat</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("barley")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/barley.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Barley</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("soyabean")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/soy.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Soyabean</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("copra")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/coconut.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Coconut</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div className="comm-card1" onClick={()=>resultPage("bajra")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/potato.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Bajra</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("rape")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Mustard</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("cotton")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Cotton</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("ragi")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/office/48/000000/wheat.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Ragi</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("arhar")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Arhar</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div className="comm-card" onClick={()=>resultPage("gram")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Gram</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("maize")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/corn.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Maize</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("moong")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Moong</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>

                    </div>
                    <div className="comm-card" onClick={()=>resultPage("masoor")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Masoor</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("urad")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Urad</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="comm-card1" onClick={()=>resultPage("sugarcane")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/bamboo.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Sugarcane</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("jute")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/potato.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Raw Jute</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("jowar")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/potato.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Jowar</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("niger")}>
                        <div>
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Niger</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("sesamum")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/sesame.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Sesamum</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div className="comm-card" onClick={()=>resultPage("sunflower")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/potato.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Sunflower</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>

                    </div>
                    <div className="comm-card1" onClick={()=>resultPage("groundnut")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/peanuts.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Groundnut</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                    <div className="comm-card" onClick={()=>resultPage("safflower")}>
                        <div >
                            <div className="comm-circle">
                                <img src="https://img.icons8.com/color/48/000000/paper-bag-with-seeds.png" />
                            </div>
                            <h3 className="comm-title"><span class="comm-title">Safflower</span></h3>
                        </div>
                        <div className="comm-bar">
                            <div className="comm-emptybar"></div>
                            <div className="comm-filledbar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Commodity