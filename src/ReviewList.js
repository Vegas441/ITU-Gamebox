import React from 'react'
import ReviewCard from './ReviewCard'

/**
 * Review page - will serve as home page
 * @param {} param0 
 * @returns 
 */
export default function ReviewList({ reviews }) {
  return (
    <div className='container' style={{ display: 'flex', justifyContent: 'center'}}>
      {reviews.map(review => {
        return (
          <ReviewCard review={review}/>
        )
      })}
    </div>
  )
}
