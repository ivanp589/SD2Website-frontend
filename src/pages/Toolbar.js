import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Geocode from "react-geocode";

function Toolbar({updateInitialCenter}) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async () => {
    // console.log(`Searching for: ${query}`);
    // Do something with the search query (e.g. send a search request to a server)
    if (location.pathname === '/1' || '/2') {
      // search
      const city = await geocodeCity(query);
      updateInitialCenter(city)
    }
  };

  const geocodeCity = async (cityName) => {
    try {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
      const response = await Geocode.fromAddress(cityName);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error('Error geocoding city:', error);
      return null;
    }
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
