import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Toolbar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(`Searching for: ${query}`);
    // Do something with the search query (e.g. send a search request to a server)
  };

  const handleInputChange = (event) => {
    // console.log(event.target.value); // add this line to debug
    setQuery(event.target.value);
  };

  const navigate = useNavigate();

  const handleButton3Click = () => {
     navigate('/Login');
  };

  return (
    <div className="toolbar">
      <div className="buttons">
        <button>Button 1</button>
        <button>Button 2</button>
        <button onClick={handleButton3Click}>Login</button>
      </div>
      <div className="search">
        <input
        //   type="text"
          placeholder="Search"
          value={query}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Toolbar;
