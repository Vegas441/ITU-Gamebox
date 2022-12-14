import React, {useState, useEffect} from 'react'
import './ProfilePage.css'
import currentUser from '../current_user';
import ListCard from '../list/ListCard';
import ReviewCard from '../ReviewCard';
import { useParams } from 'react-router-dom';

export default function Profile() {
    const [owner, setOwner] = useState(null);
    const [lists, setLists] = useState([]);
    const [reviews, setReviews] = useState([]);

    let { userID } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/userProfiles/${userID}`).then(res => {
            return res.json();
        }).then(data => {
            if(data) {
                setOwner(data);
            }
        }
    )}, []);
    
    useEffect(() => {
        fetch(`http://localhost:8000/lists`).then(res => {
            return res.json();
        }).then(data => {
            if(data && owner) {
                data = data.filter(list => list.userID == owner.id);
                setLists(data);
            }
        }
    )}, [owner]);

    useEffect(() => {
        fetch(`http://localhost:8000/reviews`).then(res => {
            return res.json();
        }).then(data => {
            if(data && owner) {
                data = data.filter(review => review.userID == owner.id);
                setReviews(data);
            }
        }
    )}, [owner]);

    return (
        <>
        {owner && <div className='profile-page'>
            <img className='profile-pic' src={owner.image} alt='profile pic'/>
            <div className='profile-details'>
                <div className='profile-detail'>
                    <h4>Username</h4>
                    <h2 className='profile-name'>{owner.name}</h2>
                </div>
                <div className='profile-detail'>
                    <h4>Bio</h4>
                    <p className='profile-bio'>{owner.bio}</p>
                </div>
            </div>
            <h2>Lists</h2>
            <div className='list-container'>                    
                {lists.map(list => {
                    return <ListCard key={list.id} list={list}/>
                })}
            </div>
            <h2>Reviews</h2>
            <div className='list-container'>
                {reviews.map(review => {
                    return <ReviewCard key={review.id} review={review}/>
                })}
            </div>
        </div>}
        </>
    )
}
