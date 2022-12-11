import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactStars from "react-stars";
import GameCard from './GameCard';
import RateCard from "./RateCard";

export default function ReviewPage() {

    const [review, setReview] = useState(null);
    const [game, setGame] = useState(null); 
    const [user, setUser] = useState(null);

    // Pulls userID and gameID parameters from link 
    const location = useLocation()
    const { gameID, userID } = location.state
    // Pulls reviewId from url
    let { reviewID } = useParams()

    // Fetch data by id 
    useEffect(() => {
        fetch(`http://localhost:8000/reviews/${reviewID}`).then(res => {
            return res.json();
        }).then(data => {setReview(data)})
        if(gameID) fetch(`http://localhost:8000/games/${gameID}`).then(res => {
            return res.json();
        }).then(data => {setGame(data)});
        if(userID) fetch(`http://localhost:8000/userProfiles/${userID}`).then(res => {
            return res.json();
        }).then(data => {setUser(data)});
    }, []);

    return (
        <>
        {review &&
            <div className="container">
                {game && <GameCard gameId={gameID}/>}
                {user &&    <img
                    src= {user.image}
                    alt=''
                    width="50"
                    height="50" 
                    style={{borderRadius: '50%', marginTop: '-150px', marginLeft: '75px'}}
                />
                }
                <p style={{ color: 'white', fontSize: '22px',display: 'inline', position: 'relative', bottom: '70px', left: '15px' }}>Review by {user &&  <b>{user.name}</b>}</p>
                <div style={{marginLeft: '-5%'}}>
                <hr style={{color: '#14181c', width: '500px', marginLeft: '350px', marginTop: '-250px'}}/>
                {game && <h1 style={{color: 'white', marginLeft: '350px', fontWeight: 'bold'}}>{game.name}
                <p style={{ display: 'inline', fontSize: '20px', fontWeight: 'normal', marginLeft:'20px'}}>{game.releaseDate}</p>
                <ReactStars size={32} count={review.rating} color1={'yellow'} edit={ false } style={{ display: 'inline'}}/></h1>
                }
                {game && <p style={{color: 'white', marginLeft: '350px', maxWidth: '700px'}}>{review.content}</p>}
                </div>

                {game && 
                <div style={{float: 'right', marginTop: '-220px'}}>
                    {game && <RateCard game={game}/>}
                </div>}
            </div>
        }
        </>
    )
}