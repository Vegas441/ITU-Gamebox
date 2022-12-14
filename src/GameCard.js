/**
 * @author David Svaty (xsvaty01)
 */
import React, { useState, useEffect } from 'react';

export default function GameCard({ gameId }) {

    const [game, setGame] = useState(null);
    // Fetch my reviews
    useEffect(() => {
        fetch(`http://localhost:8000/games/${gameId}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          setGame(data);
          //console.log(data);
        });
      }, []);

    return (
      <>
      {game && <img alt={game.id} src={game.image} style={{height: '310px', width: '207px', marginTop: '110px', borderRadius: '5%'}}/>}
      </>
    )
}