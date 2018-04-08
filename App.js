import React from 'react';
import { Dimensions } from 'react-native';
import { MapView, Permissions, Location } from 'expo';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function createMarker(modifier = 1) {
  return {
    latitude: LATITUDE - (SPACE * modifier),
    longitude: LONGITUDE - (SPACE * modifier),
    title: "title for "+modifier,
    description: "description for "+modifier,
  };
}

const MARKERS = [
  createMarker(),
  createMarker(2),
  createMarker(3),
  createMarker(4),
];

export default class App extends React.Component {
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    locationResult: null,
    location: {coords: { latitude: LATITUDE, longitude: LONGITUDE }},
    markers: MARKERS,
  };

  onRegionChange = (region) => {
    this.setState({ region });
  }

  componentDidMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
    // set state.region to current location
    this.setState({region:{ latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA }});
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}>
        <MapView.Marker
          coordinate={this.state.location.coords}
          title="My Marker"
          description="Current Location"/>
        {this.state.markers.map((marker, i) => (
           <MapView.Marker
             key={i}
             coordinate={marker}
             title={marker.title}
             description={marker.description}
           />
         ))}
      </MapView>
    );
  }
}
