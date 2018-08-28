import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import '../../../App.css';

import {
  getCoordinates
} from '../actions';

let socket;

class Main extends Component {
  componentDidMount() {
    socket = openSocket('http://localhost:3000');
    socket.on('coordinates', coordinates => {
      console.log('coordinates', coordinates)
      this.props.getCoordinates(coordinates)
    });
    socket.emit('fetchCoordinates');
  }

  render() {
    return (
      <div>
        <h3>Coordinates</h3>
        {this.props.coordinates.map((item, index) => (
          <div key={index}>
           {`${index + 1}) latitude: ${item.lat}, longitude: ${item.long}`}
          </div>
        ))}
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
