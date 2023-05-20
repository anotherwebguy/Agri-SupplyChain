import React, { useEffect, useState } from 'react'
import InvestorSidebar from './InvestorSidebar'
import SubNav from '../../utils/SubNav'
import InvestmentCard from './InvestmentCard'
import axios from 'axios';

function Investments() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getInvestments`)
            .then((response) => {
                setResult(response.data);
                console.log(response.data);
            })
    });

    const list = result.map((element) => {
        return (
            <InvestmentCard user={element.user} crop_name={element.crop_name} quantity={element.quantity} holding={element.holding} amount={element.amount} />
        );
    })

    return (
        <div className='home-body'>
            <div className='left-body'>
                <InvestorSidebar investments='1'></InvestorSidebar>
            </div>
            <div className='right-body'>
                <SubNav heading='Investments'></SubNav>
                <div className='broadcast-body'>
                    <h3>Investments</h3>
                    <div className='container-fluid py-4'>
                        <div className='row'>
                            {list}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Investments