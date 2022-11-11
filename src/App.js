import React, { useState } from "react";
import ReviewList from "./ReviewList";
import GameboxNavbar from "./GameboxNavbar";

function App() {
  const [games, setGames] = useState([
    {id: 1, name: 'Red Dead Redemption 2', image: '/posters/rdr2.jpg'},
    {id: 2, name: 'Elden Ring', image: '/posters/elden_ring.jpg'},
    {id: 3, name: 'Mass effect 3', image: '/posters/me3.jpg'},
    {id: 4, name: 'Death Stranding', image: '/posters/death_stranding.jpg'},
    {id: 5, name: 'God of War', image: '/posters/gow.jpg'}
  ])

  const [userProfile, setUserProfile] = useState([
    {name: 'User1234', bio: 'will add later' ,image: '/profile_pics/person_0.jpg'}, 
    {name:'ShadowNinja', bio: 'will add later', image:'/profile_pics/person_1.jpg'},
    {name: 'Anomaly', bio: 'will add later', image:'profile_pics/person_2.png'},
    {name: 'Boris', bio: 'will add later', image:'profile_pics/person_3.jpg'},
    {name: 'idk1234', bio: 'will add later', image:'profile_pics/person_4.jpg'},
    {name: 'Shaman', bio: 'will add later', image:'profile_pics/person_5.avif'},
    {name: 'iMolestToasters', bio: 'will add later', image:'profile_pics/person_6.jpg'}
  ]) // example profiles

  const [reviews, setReviews] = useState([
    {id: 1, name: 'Review_0', user: userProfile[1], game: games[0], rating: 5, content: 'Amazing, finally some good f*cking game.', date: '26-10-2022'},
    {id: 2, name: 'Review_1', user: userProfile[2], game: games[1], rating: 4, content: 'Pretty good', date: '11-11-2022'},
    {id: 3, name: 'Review_3', user: userProfile[3], game: games[3], rating: 2, content: 'Walking simulator', date: '5-11-2022'}
  ])
  
  return (
    <>
      <GameboxNavbar userProfile={userProfile}/>
      <h1 style={{color: 'white', fontSize: '36px', textAlign: 'center', marginTop: '10%', fontWeight: 'normal'}}>Reviews from friends</h1>
      <hr style={{color: '#14181c'}}/>
      <ReviewList reviews={reviews}/>
    </>
  );
}

export default App;
