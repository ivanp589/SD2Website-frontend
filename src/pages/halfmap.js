import React, { useState, useEffect } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

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

const MapContainer = ({ onMarkerClick, google, center}) => {
  const [potholeData, setPotholeData] = useState([]);
  const [mapStyles, setMapStyles] = useState(fullScreenMapStyles);
  const [initialCenter, setInitialCenter] = useState(null);
  const [name, setName] = useState(null);


  useEffect(() => {
    const fetchPotholeData = async () => {
        //should be logic to gather this file name from the database

        // Extract latitude and longitude from the string
        let fileName1 =  "28.601726_-81.196485.ply" // Assuming data is an array and contains the filename "28.601725_-81.196520.ply"
        
        let fileName = fileName1.replace(".ply", "");
        const [lat, long] = fileName.split('_')//.split('.').slice(0, -1);
        

        // Set the latitude and longitude values
        // console.log(lat,long)
        setPotholeData([{ latitude: parseFloat(lat), longitude: parseFloat(long) , fileName:fileName1}]);

    };

    fetchPotholeData();
  }, []);
  // useEffect(() => {
  //   const fetchPotholeData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://testbucket1senior-design.s3.amazonaws.com/potholeData.json'
  //       );
  //       const data = await response.json();
  //       setPotholeData(data);
  //     } catch (error) {
  //       console.error('Error fetching pothole data:', error);
  //     }
  //   };

  //   fetchPotholeData();
  // }, []);

  useEffect(() => {
    if (center) {
      setInitialCenter(new google.maps.LatLng(center.lat, center.lng));
    }
  }, [center]);

  const handleMarkerClick = (marker) => {
    setMapStyles(halfScreenMapStyles);
    onMarkerClick(marker);
  };

  return (
    <Map
      google={google}
      styles={mapType}
      style={mapStyles}
      center={initialCenter}
      zoom={14}
    >
      {potholeData.map((data) => (
        <Marker
          // key={data.id}
          title={"no title"}
          name={data.fileName}
          model="sphere"
          coords= {{ lat: data.latitude, lng: data.longitude }}
          position={{ lat: data.latitude, lng: data.longitude }}
          onClick={handleMarkerClick}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
}))(MapContainer);
