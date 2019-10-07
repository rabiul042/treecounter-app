import React, { Component } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2FuamF5LXJhZGFkaXlhOTEiLCJhIjoiY2sxMXgwNWlxMGg0ZDNjcGd4bGNtcHJtdSJ9.qC7IzoEEJ_DFtGzz02nvSw'
);

class MapboxMap extends Component {
  state = {
    pointInView: null
  };

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  renderPointInView() {
    if (!this.state.pointInView) {
      return <Text>Touch map to see xy pixel location</Text>;
    }

    return [
      <Text key={'x'}>x: {this.state.pointInView[0]}</Text>,
      <Text key={'y'}>y: {this.state.pointInView[1]}</Text>
    ];
  }

  onPress = async e => {
    console.log(e);
    const pointInView = await this.map.getPointInView(e.geometry.coordinates);
    this.setState({ pointInView });
  };

  render() {
    return (
      <MapboxGL.MapView
        zoomLevel={19}
        ref={c => (this.map = c)}
        onPress={this.onPress}
        style={this.props.mapStyle}
      >
        {this.renderPointInView()}
      </MapboxGL.MapView>
    );
  }
}

MapboxMap.propTypes = {
  mapStyle: PropTypes.object
};

export default MapboxMap;
