import React, { useState } from "react";
import ReviewList from "./ReviewList";
import GameboxNavbar from "./GameboxNavbar";

function App() {
  const [reviews, setReviews] = useState([{id: 1, name: 'Review_0', user: "niBBa1337_xXx", game: 'RDR2', 
  rating: 5, content: 'Amazing, finally some good fucking game.', date: '26-10-2022'}]) 
  return (
    <>
      <GameboxNavbar/>
      <ReviewList reviewList={reviews}/>
    </>
  );
}

export default App;
