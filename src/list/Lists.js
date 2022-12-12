import React from 'react'
import ListCard from './ListCard'

export default function Lists({ lists }) {
  return (
    <>
    <hr style={{color: '#14181c'}}/>
    <div className='container' style={{ display: 'flex', justifyContent: 'center'}}>
      {lists.map(list => {
        return (
          <ListCard list={list} key={list.id}/>
        )
      })}
    </div>
    </>
  )
}
