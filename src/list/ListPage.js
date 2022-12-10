import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import GameCardList from "./GameCardList";

export default function ListPage() {

    const [list, setList] = useState(null);
    const [user, setUser] = useState(null);
    const [games, setGames] = useState([]);

    const location = useLocation()
    const { userID } = location.state
    let { listID } = useParams()

    useEffect(() => {
        fetch(`http://localhost:8000/lists/${listID}`).then(res => {
            return res.json();
        }).then(data => {
            setList(data);            
            if(data.games) getGames(data.games);
        });
        if(userID) fetch(`http://localhost:8000/userProfiles/${userID}`).then(res => {
            return res.json();
        }).then(data => {setUser(data)});
    }, []);

    const getGames = (games) => {
        return Promise.all(games.map((id) => fetch(`http://localhost:8000/games/${id}`)))
        .then(responses => {
          return Promise.all(
            responses.map(response => {
              return response.json();
            })
          );
        })
        .then(data => {setGames(data)});
    }

    return (
        <>
        {list &&
            <div className="container">
                {list && <h1 style={{color: 'white', marginLeft: '350px', fontWeight: 'bold'}}>{list.name}</h1>}
                {user &&    <img
                    src= {user.image}
                    alt=''
                    width="50"
                    height="50" 
                    style={{borderRadius: '50%'}}
                    />
                }
                <p style={{ color: 'white', fontSize: '22px',display: 'inline', position: 'relative', left: '15px' }}>Created by {user &&  <b>{user.name}</b>}</p>
                {games && <GameCardList games={games}></GameCardList>}
            </div>
        }
        </>
    )
}