import React, { useState, useEffect } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { getObject } from './objects/drawObject';


function delay(model) {
  setTimeout(function() {
    getObject(model); // draw the object
  }, 200);
}

function toCall(model) {
  if (document.readyState === 'complete') {
    delay(model);
  } else {
    document.onreadystatechange = function() {
      if (document.readyState === 'complete') {
        delay(model);
      }
    };
  }
}

const homeLatlng = { lat: 28.3877, lng: -81.5554 };

const fullScreenMapStyles = {
  width: '100%',
  height: '100vh',
};

const mapType = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const MapContainer = ({ google }) => {
  const [potholeData, setPotholeData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);

  useEffect(() => {
    const fetchPotholeData = async () => {
      try {
        const response = await fetch(
          'https://testbucket1senior-design.s3.amazonaws.com/potholeData.json'
        );
        const data = await response.json();
        setPotholeData(data);
      } catch (error) {
        console.error('Error fetching pothole data:', error);
      }
    };

    fetchPotholeData();
  }, []);

  

  const handleMarkerClick = ( props,marker,e) => {
    setSelectedMarker(marker);
    setShowingInfoWindow(true);
    toCall(marker)
  };

  return (
    <Map
      google={google}
      styles={mapType}
      style={fullScreenMapStyles}
      initialCenter={homeLatlng}
      zoom={14}
    >
      {potholeData.map((data) => (
        <Marker
          key={data.id}
          title={data.id.toString()}
          name={data.location}
          model="sphere"
          position={{ lat: data.coordinates.lat, lng: data.coordinates.long }}
          coords={{ lat: data.coordinates.lat, lng: data.coordinates.long }}
          onClick={handleMarkerClick}
        />
      ))}
      <InfoWindow marker={selectedMarker} visible={showingInfoWindow}>
        <div style={{ width: '400px', height: '400px', overflow: 'hidden' }} id="render">
          {/* Render your content here */}
          {/* Add some static content for testing */}
          <h3>InfoWindow Content</h3>
          <p>Testing</p>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
}))(MapContainer);
