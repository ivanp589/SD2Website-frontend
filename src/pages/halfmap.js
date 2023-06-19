import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const homeLatlng = { lat: 28.3877, lng: -81.5554 };

const fullScreenMapStyles = {
  width: '100%',
  height: '100vh',
};

const halfScreenMapStyles = {
  width: '50%',
  height: '95vmin',
  float: 'left',
};

const mapType = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

const MapContainer = ({ onMarkerClick, google }) => {
  const [potholeData, setPotholeData] = useState([]);
  const [mapStyles, setMapStyles] = useState(fullScreenMapStyles);

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

  const handleMarkerClick = (marker) => {
    setMapStyles(halfScreenMapStyles);
    onMarkerClick(marker);
  };

  return (
    <Map
      google={google}
      styles={mapType}
      style={mapStyles}
      initialCenter={homeLatlng}
      zoom={14}
    >
      {potholeData.map((data) => (
        <Marker
          key={data.id}
          title={data.id.toString()}
          name={data.location}
          model="sphere"
          coords= {{ lat: data.coordinates.lat, lng: data.coordinates.long }}
          position={{ lat: data.coordinates.lat, lng: data.coordinates.long }}
          onClick={handleMarkerClick}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
}))(MapContainer);
