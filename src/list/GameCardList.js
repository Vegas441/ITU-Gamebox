import React from "react";
import ListGameCard from "./ListGameCard";

export default function GameCardList(props) {
  function removeGame(game) {
    props.removeGame(game);
  }

  return (
    <>
    <hr style={{color: '#14181c'}}/>
    <div className='list-container'>
      {props.games.map(game => {
        return (
          <ListGameCard removeGame={removeGame} isOwner={props.isOwner} game={game} key={game.id}/>
        )
      })}
    </div>
    </>
  )
}
  