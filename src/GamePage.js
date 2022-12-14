/* author: Vitezslav Cupl (xcuplv00) */

import React from 'react'
import { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import './GamePage.css'
import ReactStars from "react-stars";
import RateCard from './RateCard';

function GamePage() {
  let { gameID } = useParams();

  const [game, setGame] = useState(null); 

  const [review, setReview] = useState(null);

  const [user, setUser] = useState(null);
  
  // Fetch data by id
  useEffect(() => {
    fetch(`http://localhost:8000/games/${gameID}`).then(res => {
    return res.json();
  }).then(data => {setGame(data)});
    fetch(`http://localhost:8000/reviews`).then(res => {
    return res.json();
  }).then(data => {setReview(data)});
    fetch(`http://localhost:8000/userProfiles`).then(res => {
    return res.json();
  }).then(data => {setUser(data)});
  }, []);

  return (
    <div className="gamePage">
      <div className="gameName">
        {game && <h1 >{game.name} <p style={{display: 'inline', fontSize: '20px'}}>({game.releaseDate})</p></h1>}
      </div>
      <div className="container">
        
        <div className="gameImg">
          {game && <img 
            src={game.image} 
            alt='' 
            style={{height:"400px", width:"300px", borderRadius: '5%'}}/> }
        </div>
        <div className="gameRelease">
          {game && <p style={{maxWidth: '500px'}}>{/*Release date: {game.releaseDate}*/}</p> }
        </div>
        <div style={{marginLeft: '80%'}}> 
          {game && <RateCard game={game}/>}
        </div>
        <div className="gameDesc">
          {game && <p style={{maxWidth: '1500px'}}>Description: {game.desc}</p>}
        </div>
        <div className="revSec">
          <div className="revHeader">
            <h3 >Reviews</h3>
          </div>
          <div className="revItems">
            {review && review.map((value) => {
              return (value.gameID == gameID) ? (
                <div className="rating">
                  <p>{ user && 
                    <img
                    src= {user[value.userID-1].image}
                    alt=''
                    width="30"
                    height="30" 
                    style={{borderRadius: '50%', marginRight: '5px'}}
                    />}

                    {user && user[value.userID - 1].name}: {value.content} 
                  </p>
                  <p><ReactStars size={20} count={value.rating} color1={"yellow"} edit={ false }/></p>
              </div>
              
              ) : "";
            })}
          </div>
        </div>
      
      </div>
      

      
    </div>
  )
}

export default GamePage