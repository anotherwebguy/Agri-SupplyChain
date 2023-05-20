import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LeftTimelineCard from '../../utils/LeftTimelineCard';
import RightTimelineCard from '../../utils/RightTimelineCard';
import '../../css/trackstatus.css'

function AdminStatusView(props) {
    const { id, status } = props
    const [results, setResults] = useState([]);

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
                <LeftTimelineCard
                    public_key={d.public_key}
                    name={d.name}
                    role={d.role}
                    contact={d.contact}
                    address={d.address}
                ></LeftTimelineCard>
            );
        }
        i++;
        return (
            <RightTimelineCard
                public_key={d.public_key}
                name={d.name}
                role={d.role}
                contact={d.contact}
                address={d.address}
            ></RightTimelineCard>
        );
    });

    return (
        <div>
            {list}
        </div>
    );
}

export default AdminStatusView