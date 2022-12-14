/* author: Vitezslav Cupl (xcuplv00) */

import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import './Search.css'

function Search({placeholder, games}) {
  const [filter, setFilter] = useState([]);
  const handleFilter = (event) => {
    const currSearch = event.target.value;
    const newFilter = games.filter((value) => {
      return value.name.toLowerCase().includes(currSearch.toLowerCase());
    });

    if (currSearch === "") {
      setFilter([]);
    } else {
    setFilter(newFilter);
    }
  }

  return (
    <div className="search">
        <div className="searchInputs">
            <input type="text" placeholder={placeholder} onChange={handleFilter} autoFocus={true}/>
        </div>
        {filter.length !== 0 && (
        <div className="dataResult">
          {filter.slice(0, 15).map((value, key) => {
            return <a className="gamesItem" href={`/gamespage/${value.id}`} style={{color: '#99aabb'}}><p>{value.name}</p></a>
          })}
        </div>)}
    </div>
  );
}

export default Search