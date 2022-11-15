import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// TODO: fetch review object from data  
export default function ReviewPage() {
    let { reviewID } = useParams()

    const [review, setReview] = useState(null);
    const [game, setGame] = useState(null); 
    const [user, setUser] = useState(null);

    // Fetch data by id | TODO: fix 
    useEffect(() => {
        fetch(`http://localhost:8000/reviews/${reviewID}`).then(res => {
            return res.json();
        }).then(data => {setReview(data)})
        if(review) fetch(`http://localhost:8000/games/${review.gameID}`).then(res => {
            return res.json();
        }).then(data => {setGame(data)});
        if(review) fetch(`http://localhost:8000/userProfiles/${review.userID}`).then(res => {
            return res.json();
        }).then(data => {setUser(data)});
    }, []);

    return (
        <>
        {review &&
            <div className="container">
                {game && 
                <img
                    src={game.image}
                    style={{height: '225px'}}
                />}
                {user && 
                <img
                    src= {user.image}
                    alt=''
                    width="25"
                    height="25" 
                    style={{borderRadius: '50%', marginRight: '5px'}}
                />
                }
                {user && <p>Review by <b>{user.name}</b></p>}
            </div>
        }
        </>
    )
}