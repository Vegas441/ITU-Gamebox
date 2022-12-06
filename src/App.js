import React, { useEffect, useState } from "react";
import ReviewsFromFriends from "./ReviewsFromFriends";
import ReviewPage from "./ReviewPage";
import GameboxNavbar from "./GameboxNavbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListsPage from "./ListsPage";
import ListPage from "./ListPage";

function App() {

  //const [games, setGames] = useState(null);
    
  const [userProfiles, setProfiles] = useState(null);
    
  const [reviews, setReviews] = useState(null);  

  useEffect(() => {
    fetch('http://localhost:8000/userProfiles')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setProfiles(data);
    });
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
      { userProfiles && <GameboxNavbar 
      userProfile={userProfiles[0]}/>}

      <Routes>

        { reviews && <Route exact path="/" element={
          <ReviewsFromFriends reviews={reviews}/>
        }/>}

        <Route exact path="/reviewpage/:reviewID" element={
          <ReviewPage />
        }/>

        <Route exact path="/listspage" element={
          <ListsPage />
        }/>

        <Route exact path="/listpage/:listID" element={
          <ListPage />
        }/>

      </Routes>

    </Router>
    </>
  );
}

export default App;
