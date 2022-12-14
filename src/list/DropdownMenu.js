import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Popup.css';

export function DropdownMenu(props) {

    const addGame = (game) => {
        props.addGame(game);
    };

    return (
        <>
            <DropdownButton
                className="dropdown-button" id='dropdown-basic-button' title='Select game'>
                {props.games.map(game => {
                    return (
                        <Dropdown.Item key={game.id}
                            onClick={() => addGame(game)}>
                            <div>
                                <img alt={game.name} src={game.image} className='icon-button' />
                                {game.name}
                            </div>
                        </Dropdown.Item>
                    );
                })}
            </DropdownButton>
        </>
    );
}
