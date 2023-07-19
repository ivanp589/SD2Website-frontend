import React, { useState, useEffect } from 'react';
import './pages.css';
import './toolbar.css';
import GoogleApiWrapper from './halfmap';
import Toolbar from './Toolbar';
import { getObject } from './objects/drawObject';

function P2() {
  const [markerSelected, setMarkerSelected] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [initialCenter, setInitialCenter] = useState({ lat: 28.3877, lng: -81.5554 });
  const [renderName, setRenderName] = useState(null);

  useEffect(() => {
    if (selectedMarker) {
      getObject(selectedMarker);
    }
  }, [selectedMarker]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMarkerSelected(true);
    setRenderName(marker.name);
  };

  const updateInitialCenter = (coordinates) => {
    setInitialCenter(coordinates);
  };

  return (
    <div className="page1div">
      <Toolbar  updateInitialCenter={updateInitialCenter}/>
      <div
        id="leftrightdiv"
        style={{ width: '100%', height: '95vmin', display: 'flex' }}
      >
        <div id="map" style={{ flex: '1' }}>
          <GoogleApiWrapper onMarkerClick={handleMarkerClick} center={initialCenter} />
        </div>
        {markerSelected ? (
          <div
            id="render"
            name={renderName}
            style={{
              flex: '1',
              position: 'relative',
              backgroundColor: '#eee',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '24px',
              }}
            >
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default P2;
