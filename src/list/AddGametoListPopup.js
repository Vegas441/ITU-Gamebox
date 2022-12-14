/**
 * @author Jakub Křivánek (xkriva30)
 */
import React, { useState, useEffect } from 'react'
import { Button} from 'react-bootstrap';
import { DropdownMenu } from './DropdownMenu';
import './Popup.css'

function AddGametoListPopup(props) {
    const [games, setGames] = useState([]);
    const [gamesToAdd, setGamesToAdd] = useState([]);
    
    useEffect(() => {
        if(props.gamesOnList && games) filterGames(props.gamesOnList);
    }, [props.gamesOnList, games]);

    useEffect(() => {
        fetch(`http://localhost:8000/games`).then(res => {
            return res.json();
        }).then(data => {
            setGames(data);
        });
    }, []); 

    function filterGames(gamesOnList) {
        var res = games.filter( game => {
            return !gamesOnList.find( gameOnList => gameOnList.id === game.id );    
        });
        setGamesToAdd(res);
    }

    const addGame = (game) => {
        props.addGame(game);
    }

    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <Button onClick={() => props.popup(false)} className='close-btn'>close</Button>
                <div className='popup-div'>
                    <h3>Add game</h3>
                </div>
                <DropdownMenu games={gamesToAdd} addGame={addGame}></DropdownMenu>
            </div>
        </div>
    ) : '';
}

export default AddGametoListPopup
