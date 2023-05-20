import React, { useEffect, useState } from 'react'
import block from "../../images/logo-ct.png";
import ReactModal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';
import RightTimelineCard from '../../utils/RightTimelineCard';
import axios from 'axios';
import '../../css/actions.css';
import LeftTimelineCard from '../../utils/LeftTimelineCard';
import LeftAdminCard from '../../utils/LeftAdminCard';
import RightAdminCard from '../../utils/RightAdminCard';

function Actions() {
    const location = useLocation();
    const id = location.state.data[0]
    const [results, setResults] = useState([]);

    useEffect(() => {
        loadData()
    })

    async function loadData() {
        let res = [];
        await axios.get(`http://localhost:3001/getData/${id}`)
            .then(async (response) => {
                setResults(await getArray(response.data));
                console.log(response.data);
            });
    }

    async function getArray(arr) {
        let res = [];
        for (const obj of arr) {
            for (const jso of obj) {
                res.push(jso);
            }
        }

        return res;
    }

    let i = 0;

    const list = results.map((d) => {
        if (i % 2 === 0) {
            i++;
            return (
                <LeftAdminCard
                    public_key={d.public_key}
                    name={d.name}
                    role={d.role}
                    contact={d.number}
                    address={d.address}
                ></LeftAdminCard>
            );
        }
        i++;
        return (
            <RightAdminCard
                public_key={d.public_key}
                name={d.name}
                role={d.role}
                contact={d.number}
                address={d.address}
            ></RightAdminCard>
        );
    });

    return (
        <div>
            {/* navbar to display admin dashboard */}
            <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
                <img
                    src={block}
                    width="30"
                    height="30"
                    class="d-inline-block align-top"
                    alt=""
                />
                &nbsp;&nbsp;
                <a className="navbar-brand" href="/admin">
                    <h5>Admin panel</h5>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/admin/verification">
                                <h1>Verification</h1>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='actions-status'>
                {list}
            </div>
        </div>
    )
}

export default Actions