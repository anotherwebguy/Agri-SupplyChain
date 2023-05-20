import React, { useEffect } from 'react'
import '../../css/nucleo-icons.css'
import '../../css/nucleo-svg.css'
import '../../css/bootstrap.css'
import '../../css/material-dashboard.css'
import '../../css/prediction.css'
import Commodity from './Commodity'
import PredictedValues from './PredictedValues'
import Gainers from './Gainers'
import Losers from './Losers'
import Sidebar from './Sidebar'
import SubNav from '../../utils/SubNav'
import axios from '../../django-ML-Api/axios'
import requests from '../../django-ML-Api/requests'

function Prediction() {

    const [TopGainers, setTopGainers] = React.useState([])
    const [TopLosers, setTopLosers] = React.useState([])
    const [sixmonths, setSixmonths] = React.useState([])

    const getSixMonths = async () => {
        const response = await axios.get(requests.winnersloosersApi);
        console.log(response.data.top5)
        setTopGainers(response.data.top5)
        console.log(response.data.bottom5)
        setTopLosers(response.data.bottom5)
        console.log(response.data.sixmonths)
        setSixmonths(response.data.sixmonths)
    }

    useEffect(() => {
        getSixMonths();
    }, [])
    
    if(TopGainers.length === 0 || TopLosers.length === 0 || sixmonths.length === 0){
        return <div>Loading...</div>
    }
    return (
        <div className='home-body'>
            <div className='left-body'>
                <Sidebar pred="1"></Sidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Crop Price Predictor'></SubNav>

                {/* Prediction values for next months */}

                <PredictedValues sixmonth = {sixmonths}></PredictedValues>

                {/* Top Gainers */}

                <Gainers obj={TopGainers}></Gainers>

                {/* Top Losers */}

                <Losers losers={TopLosers}></Losers>

                {/* Commodity section */}

                <div className='bottom-body'>
                    <Commodity></Commodity>
                </div>

            </div>
        </div>
    )
}

export default Prediction