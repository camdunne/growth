import React, { Component } from 'react';

export default class Map extends Component {
  componentDidMount() {
    this.map();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.lat !== this.props.lat) {
      this.map(nextProps);
    }
  }
  map(props) {
    const { lat, lng } = props || this.props;
    const uluru = { lat, lng };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru,
    });
    const marker = new google.maps.Marker({
      position: uluru,
      draggable: true,
      map,
      animation: google.maps.Animation.DROP,
    });
  }
  render() {
    return (
      <div id="map" style={{ position: 'fixed' }} />
    );
  }
}
