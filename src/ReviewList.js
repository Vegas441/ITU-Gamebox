import React from 'react'
import Review from './Review'

/**
 * Review page - will serve as home page
 * @param {} param0 
 * @returns 
 */
export default function ReviewList({ reviewList }) {
  return (
    reviewList.map(review => {
      return (
        <>
        
        <Review review={review}/>

        </>
      )
    })
  )
}
