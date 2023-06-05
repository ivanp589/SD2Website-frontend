import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';
import './toolbar.css';
import GoogleApiWrapper from './halfmap';
import Toolbar from './search';

function P2() {

  return (
    <div className="page1div">
      <Toolbar></Toolbar>

      <div id="leftrightdiv" style={{ width: "100%", height: "95vmin" }}>
        <div id="map" style={{ float: "left" }}>
          <GoogleApiWrapper></GoogleApiWrapper>
        </div>
        <div
          id="render"
          style={{
            width: "50%",
            height: "inherit",
            float: "right",
            position: "relative",
          }}
        ></div>
      </div>
    </div>
  );
}

export default P2;
