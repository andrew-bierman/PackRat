import React from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { View } from 'react-native';

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

class WebPackconatiner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [lng, lat],
            zoom: zoom
        });
    }

    render() {
        return (
            <View style={{ alignItems: 'center', paddingBottom: 10 }}>
                <View ref={this.mapContainer} style={{ height: '400px', width: '82%' }} />
            </View>
        );
    }
}

export default WebPackconatiner;