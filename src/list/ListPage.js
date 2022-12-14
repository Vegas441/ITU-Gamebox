/**
 * @author Jakub Křivánek (xkriva30)
 */
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import AddGametoListPopup from "./AddGametoListPopup";
import GameCardList from "./GameCardList";
import { Button } from "react-bootstrap";
import './ListsPage.css';
import currentUser from "../current_user";

export default function ListPage() {
    const user = currentUser;
    const [list, setList] = useState(null);
    const [listOwner, setListOwner] = useState(null);
    const [games, setGames] = useState([]);
    const [popup, setPopup] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const location = useLocation()
    const { userID: ownerID } = location.state
    let { listID } = useParams()

    useEffect(() => {
        if(user.id == ownerID) setIsOwner(true);
    }, [user, ownerID])

    useEffect(() => {
        fetch(`http://localhost:8000/lists/${listID}`).then(res => {
            return res.json();
        }).then(data => {
            setList(data);
            if(data.games) getGames(data.games);
        });
        if(ownerID) fetch(`http://localhost:8000/userProfiles/${ownerID}`).then(res => {
            return res.json();
        }).then(data => {setListOwner(data)});
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

    const deleteList = (list) => {
        fetch(`http://localhost:8000/lists/${listID}`, {
            method: 'DELETE',
        });
    }

    const removeGame = (game) => {
        var after_delete = games.filter(g => g.id != game.id);
        setGames(after_delete);
        if(!list.games)
            list["games"] = []
        list.games = after_delete.map(g => JSON.stringify(g.id));
        fetch(`http://localhost:8000/lists/${listID}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(list)
        })
    }

    return (
        <>
        {list &&
            <div>
                {isOwner && <>
                <Button className="add-btn" href="/listspage" onClick={() => deleteList(list)} type="submit" variant="outline-danger" size="lg">Delete list</Button>
                <Button className="add-btn" onClick={() => setPopup(true)} type="submit" variant="outline-primary" size="lg">Add game</Button>
                </> }
                <div className="list-container">
                    <div className="list-container">                    
                        {list && <h1>{list.name}</h1>}
                    </div>                  
                    {listOwner &&    <img
                        src= {listOwner.image}
                        alt=''
                        width="50"
                        height="50" 
                        style={{borderRadius: '50%', margin: '10px'}}
                        />
                    }
                    <p style={{ color: 'white', fontSize: '22px', display: 'inline'}}>Created by {listOwner &&  <b>{listOwner.name}</b>}</p>
                    {games && <GameCardList removeGame={removeGame} isOwner={isOwner} games={games}></GameCardList>}
                </div>
                {games && <AddGametoListPopup trigger={popup} popup={setPopup} gamesOnList={games} addGame={addGame}></AddGametoListPopup> }
            </div>
        }
        </>
    )
}