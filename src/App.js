import React, { useEffect, useState } from "react";
import ReviewsFromFriends from "./ReviewsFromFriends";
import ReviewPage from "./ReviewPage";
import GameboxNavbar from "./GameboxNavbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListsPage from "./list/ListsPage";
import ListPage from "./list/ListPage";
import Register from "./register_login/Register";
import Login from "./register_login/Login";
import Profile from "./profile/Profile";
import currentUser from "./current_user";
import GamesPage from "./GamesPage";
import GamePage from "./GamePage";
import MyReviews from "./MyReviews";

function App() {

  //const [games, setGames] = useState(null);
  const user = currentUser;

  const [games, setGames] = useState(null);
    
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
    fetch('http://localhost:8000/games')
    .then(res => {
      return res.json();
    })
    .then(data => {
      setGames(data);
    })
  }, []);


  return (
    <>
    <Router>
      { user && <GameboxNavbar/>}


      <Routes>
        { reviews && <Route exact path="/" element={
          <ReviewsFromFriends reviews={reviews}/>
        }/>}

        <Route exact path="/myreviews" element={
          <MyReviews/>
        }/>

        <Route exact path="/reviewpage/:reviewID" element={
          <ReviewPage />
        }/>

        <Route exact path="/profile/:userID" element={
          <Profile/>
        }/>

        <Route exact path="/register" element={
          <Register />
        }/>

        <Route exact path="/login" element={
          <Login />
        }/>

        <Route exact path="/listspage" element={
          <ListsPage />
        }/>

        <Route exact path="/listpage/:listID" element={
          <ListPage />
        }/>

        { games && <Route exact path="/gamespage" element={
          <GamesPage games={games}/>
        }/>}

        <Route exact path="/gamespage/:gameID" element={
          <GamePage />
        }/>

      </Routes>

    </Router>
    </>
  );
}

export default App;
