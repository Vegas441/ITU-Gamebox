import React from 'react'
import ListCard from './ListCard'

/**
 * Reviews from friends page - will serve as home page
 * @param {} param0 
 * @returns 
 */
export default function Lists({ lists }) {
  return (
    <>
    <h1 style={{color: 'white', fontSize: '36px', textAlign: 'center', marginTop: '10%', fontWeight: 'normal'}}>My Lists</h1>
    <hr style={{color: '#14181c'}}/>
    <div className='container' style={{ display: 'flex', justifyContent: 'center'}}>
      {lists.map(list => {
        return (
          <ListCard list={list}/>
        )
      })}
    </div>
    </>
  )
}
