import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ListPage() {

    const [list, setList] = useState(null);
    const [user, setUser] = useState(null);

    // Pulls userID and gameID parameters from link 
    const location = useLocation()
    const { userID } = location.state
    let { listID } = useParams()

    // Fetch data by id 
    useEffect(() => {
        fetch(`http://localhost:8000/lists/${listID}`).then(res => {
            return res.json();
        }).then(data => {setList(data)})
        if(userID) fetch(`http://localhost:8000/userProfiles/${userID}`).then(res => {
            return res.json();
        }).then(data => {setUser(data)});
    }, []);

    return (
        <>
        {list &&
            <div className="container">
                {list.name}
            </div>
        }
        </>
    )
}