import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AddGametoListPopup from "./AddGametoListPopup";
import GameCardList from "./GameCardList";
import { Button } from "react-bootstrap";

export default function ListPage() {

    const [list, setList] = useState(null);
    const [user, setUser] = useState(null);
    const [games, setGames] = useState([]);
    const [popup, setPopup] = useState(false);
    

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

    const addGame = (game) => {
        setGames([...games, game]);
        if(!list.games)
            list["games"] = []
        list.games = [...list.games, JSON.stringify(game.id)];            
        fetch(`http://localhost:8000/lists/${listID}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(list)
        })
    }

    return (
        <>
        {list &&
            <div className="container">
                <div>
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
                </div>
                
                <Button onClick={() => setPopup(true)} type="submit" variant="outline-primary" size="sm">Add game</Button>
                {games && <AddGametoListPopup trigger={popup} popup={setPopup} gamesOnList={games} addGame={addGame}></AddGametoListPopup> }                
                {games && <GameCardList games={games}></GameCardList>}
            </div>
        }
        </>
    )
}