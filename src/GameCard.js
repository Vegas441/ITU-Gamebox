import React from "react";

export default function GameCard({ game }) {

    return (
        <img alt={game.id} src={game.image} style={{height: '310px', width: '207px', marginTop: '110px', borderRadius: '5%'}}/>
    )
}