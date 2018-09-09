import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import '../../../App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import {
  getCoordinates
} from '../actions';

let socket;
const MapWithMarkers = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 50.4547, lng: 30.5238 }}
  >
  {props.coordinates.map( ({lat, lng}, index) => (
    <Marker
      key={index}
      position={{ lat, lng }}
    />
  ))}
  </GoogleMap>
));

class Main extends Component {
  componentDidMount() {
    socket = openSocket('http://localhost:3000');
    socket.on('coordinates', coordinates => {
      this.props.getCoordinates(coordinates)
    });
    socket.emit('fetchCoordinates');
  }

  render() {
    return (
      <div>
        <MapWithMarkers
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          coordinates={this.props.coordinates}
        />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  coordinates: state.main.coordinates,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCoordinates
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
