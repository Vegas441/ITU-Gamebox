/* author: Vitezslav Cupl (xcuplv00) */

import React from 'react'
import './SearchBar.css'
import { FaWindowClose } from 'react-icons/fa'

function SearchBar(props) {
  return (props.trigger) ? (
    <div className="searchbar">
        <div className="searchbar-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}><FaWindowClose /></button>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default SearchBar