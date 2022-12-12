import React, { useState, useEffect } from 'react'
import { Button, Dropdown, DropdownButton} from 'react-bootstrap';
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
                <h3>Add game</h3>   
                <DropdownMenu games={gamesToAdd} addGame={addGame}></DropdownMenu>
            </div>
        </div>
    ) : '';
}

export default AddGametoListPopup

function DropdownMenu(props) {

    const addGame = (game) => {
        props.addGame(game)
    }

    return (
        <>
        <DropdownButton
            className="dropdown-button" id='dropdown-basic-button' title='Add game'>
            {props.games.map(game => {
                return (
                    <Dropdown.Item key={game.id} className='dropdown-item' 
                        onClick={() => addGame(game)}>
                        <div>
                            <img alt={game.name} src={game.image} className='icon-button'/>
                            {game.name}
                        </div>                        
                    </Dropdown.Item>
                )
            })}
        </DropdownButton>
        </>
    )
}