import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2FuamF5LXJhZGFkaXlhOTEiLCJhIjoiY2sxMXgwNWlxMGg0ZDNjcGd4bGNtcHJtdSJ9.qC7IzoEEJ_DFtGzz02nvSw'
);

class MapboxMap extends Component {
  state = {
    pointInView: null,
    coordinates: null,
    location: null
  };

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  renderPointInView() {
    if (!this.state.pointInView) {
      return <Text>xy</Text>;
    }

    return [
      <Text key={'x'}>x: {this.state.pointInView[0]}</Text>,
      <Text key={'y'}>y: {this.state.pointInView[1]}</Text>
    ];
  }

  onPress = async e => {
    console.log(e);
    const pointInView = await this.map.getPointInView(e.geometry.coordinates);
    this.setState({ pointInView, coordinates: e.geometry.coordinates });
  };

  render() {
    return (
      <View>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={11}
          ref={c => (this.map = c)}
          onPress={this.onPress}
          style={this.props.mapStyle}
          logoEnabled={false}
          centerCoordinate={[-122.41, 37.79]}
          compassEnabled
          showUserLocation
        >
          {this.state.pointInView ? (
            <>
              <MapboxGL.PointAnnotation
                id="mylocation"
                title="test"
                coordinate={[
                  this.state.coordinates[0],
                  this.state.coordinates[1]
                ]}
                draggable
              >
                <Text>T</Text>
              </MapboxGL.PointAnnotation>
              <MapboxGL.Camera
                zoomLevel={2}
                centerCoordinate={[
                  this.state.coordinates[0],
                  this.state.coordinates[1]
                ]}
              />
            </>
          ) : (
            <></>
          )}
        </MapboxGL.MapView>
      </View>
    );
  }
}

MapboxMap.propTypes = {
  mapStyle: PropTypes.object
};

export default MapboxMap;
