import React from 'react';
import { MapView } from 'expo';

export default class App extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  onRegionChange = (region) => {
    this.setState({ region });
  }

  render() {
    return (
      
      <MapView
        style={{ flex: 1 }}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );
  }
}
