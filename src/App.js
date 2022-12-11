import React, { useEffect, useState } from "react";
import ReviewsFromFriends from "./ReviewsFromFriends";
import ReviewPage from "./ReviewPage";
import MyReviews from "./MyReviews";
import GameboxNavbar from "./GameboxNavbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import currentUser from "./current_user";


function App() {

  //const [games, setGames] = useState(null);
    
  const [userProfiles, setProfiles] = useState(null);
    
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/reviews')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setReviews(data);
    });
  }, []);


  return (
    <>
    <Router>
      { currentUser && <GameboxNavbar 
      userProfile={currentUser}/>}

      <Routes>

        { reviews && <Route exact path="/" element={
          <ReviewsFromFriends reviews={reviews}/>
        }/>}

        <Route exact path="/reviewpage/:reviewID" element={
          <ReviewPage />
        }/>

        <Route exact path="/myreviews" element={
          <MyReviews />
        }/>

      </Routes>

    </Router>
    </>
  );
}

export default App;
