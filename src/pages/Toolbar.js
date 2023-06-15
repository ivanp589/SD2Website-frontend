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

  const handleButton1Click = () => {
    if (location.pathname === '/1') {
      navigate('/table');
    } else if (location.pathname === '/table') {
      navigate('/1');
    } else {
      navigate('/table');
    }
  };

  const handleButton2Click = () => {
    navigate('/Upload');
  };

  const handleButton3Click = () => {
    navigate('/Login');
  };

  const isLoginOrSignup = location.pathname === '/Login' || location.pathname === '/Signup';
  const isUploadPage = location.pathname === '/Upload';
  const isMapView = location.pathname === '/table';
  const isTableView = location.pathname === '/1' || location.pathname === '/2';

  return (
    <div className="toolbar">
      {!(isLoginOrSignup || isUploadPage) && (
        <div className="buttons">
          <button onClick={handleButton1Click}>{isTableView ? 'Table View' : 'Map View' }</button>
          <button onClick={handleButton2Click}>Upload</button>
          <button onClick={handleButton3Click}>Login</button>
        </div>
      )}

      <div className="logo">
        <Link to="/1">Road Scan</Link>
      </div>

      {!(isLoginOrSignup || isUploadPage) && (
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
