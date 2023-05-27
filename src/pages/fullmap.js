import React, { Component ,} from 'react';
import { Map ,Marker,InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import { getObject } from './objects/drawObject';
// this file is the fullscreen maps page
function delay(model) {
  setTimeout(function() {
    getObject(model);//draw the object
  }, 200);
}

function toCall(model){
  if (document.readyState === 'complete') {
    delay(model);
  } 
  else {
    document.onreadystatechange = function () {
      if (document.readyState === "complete") {
        delay(model);
      }
    }
  }
}
// above two funcitons wait for the element to be loaded

const homeLatlng = {lat: -1.2884, lng: 36.8233};

const mapStyles = {
  width: '100%',
  height: '95vmin',
  float:'left',
  initialCenter: homeLatlng,
  zoom:{zoom:14},
  
}

const mapType = [{
  featureType: "poi",
  elementType: "labels",
  stylers:[{visibility: "off"}]
}]


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) =>{

    
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    toCall(marker.model)
  }

  
 

  render() {
    return (
      <Map//no this did not take multiple hours to figure out styles/style
        google={this.props.google}
        styles={mapType}
        style={mapStyles}
        
      >
      <Marker
        title={'Pothole ID or name'}
        name={'name of street'}
        model={"sphere"}
        position={{lat: 37.778519, lng: -122.405640}}
        onClick={this.onMarkerClick} />
      <Marker
        title={'bofa'}
        name={'bofa'}
        model={"other"}
        position={{lat: 37.798519, lng: -122.505640}}
        onClick={this.onMarkerClick} />

      <InfoWindow
      marker={this.state.activeMarker}
      visible={this.state.showingInfoWindow}
      >
        <div style={{width:"400px",height:"400px", overflow:'hidden'}} id='render'>
          <h1>{this.state.selectedPlace.name}</h1>
        </div>
      </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);

