import React from "react";
import GameCard from "../GameCard"

export default function GameCardList({ games }) {
    return (
      <>
      <hr style={{color: '#14181c'}}/>
      <div className='container' style={{ display: 'flex', justifyContent: 'center'}}>
        {games.map(game => {
          return (
            <GameCard game={game} key={game.id}/>
          )
        })}
      </div>
      </>
    )
  }
  