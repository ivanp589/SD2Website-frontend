import React, { useState, useEffect } from 'react';
import './pages.css';
import GoogleApiWrapper from './fullmap'
import Toolbar from './Toolbar';
//fullscreen maps page




function P2() {
  const [initialCenter, setInitialCenter] = useState({ lat: 28.3877, lng: -81.5554 });
  
  const updateInitialCenter = (coordinates) => {
    setInitialCenter(coordinates);
  };
  return (
    <div className="page1div"/**this is the containing div*/>
      <Toolbar updateInitialCenter={updateInitialCenter}></Toolbar>

        <div id='leftrightdiv' style={{width:"100%",height:"95vmin"}}>

          <div id='map' style={{float:"left"}}>
          <GoogleApiWrapper center={initialCenter}></GoogleApiWrapper>
          </div>

        </div>
        
    </div>
  );
}

export default P2;