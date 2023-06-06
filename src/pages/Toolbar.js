import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Toolbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    console.log(`Searching for: ${query}`);
    // Do something with the search query (e.g. send a search request to a server)
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleButton3Click = () => {
    navigate('/Login');
  };

  const isLoginOrSignup = location.pathname === '/Login' || location.pathname === '/Signup';

  return (
    <div className="toolbar">
      {!isLoginOrSignup && (
        <div className="buttons">
          <button>Button 1</button>
          <button>Button 2</button>
          <button onClick={handleButton3Click}>Login</button>
        </div>
      )}

      <div className="logo">
        <Link to="/1">Road Scan</Link>
      </div>

      {!isLoginOrSignup && (
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
}

export default Toolbar;