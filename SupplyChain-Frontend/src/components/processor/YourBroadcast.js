import React, { useEffect, useState } from 'react'
import SubNav from '../../utils/SubNav'
import ProcessorBroadcastCard from './YourBroadcastCard'
import ProcessorSidebar from './ProcessorSidebar'
import YourBroadcastCard from './YourBroadcastCard'
import axios from 'axios'
import { useSelector } from 'react-redux'

function YourBroadcast() {

    const id = useSelector((state) => state.db.userAcc);
    const [results, setResults] = useState([]);
    let result;

    useEffect(() => {
        axios.get(`http://localhost:3001/processorBroadcast/${id}`)
            .then((response) => {
                result = response.data;
                setResults(result);
            })
    })

    const list = results.map((d) => {
        return (
            <YourBroadcastCard name={d.product_name} quantity={d.quantity} price={d.price}></YourBroadcastCard>
        )
    })

    return (
        <div className='home-body'>
            <div className='left-body'>
                <ProcessorSidebar ybroad></ProcessorSidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Your Broadcasts'></SubNav>
                <div className='broadcast-body'>
                    <h3>Your Broadcasts!</h3>
                    <div className="container-fluid py-4">
                        <div className="row">
                            {list}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourBroadcast