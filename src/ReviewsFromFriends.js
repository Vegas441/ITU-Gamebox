import React from 'react'
import ReviewCard from './ReviewCard'

/**
 * Reviews from friends page - will serve as home page
 * @param {} param0 
 * @returns 
 */
export default function ReviewsFromFriends({ reviews }) {
  return (
    <>
    <h1 style={{color: 'white', fontSize: '36px', textAlign: 'center', marginTop: '10%', fontWeight: 'normal'}}>Reviews from friends</h1>
    <hr style={{color: '#14181c'}}/>
    <div className='container' style={{ display: 'flex', justifyContent: 'center'}}>
      {reviews.map(review => {
        return (
          <ReviewCard key={review.id} review={review}/>
        )
      })}
    </div>
    </>
  )
}
