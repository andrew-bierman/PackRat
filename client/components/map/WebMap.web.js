import React, { useRef, useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { View, StyleSheet } from "react-native";
// import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

// class WebPackContainer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             lng: -70.9,
//             lat: 42.35,
//             zoom: 9
//         };
//         this.mapContainer = React.createRef();
//     }

//     componentDidMount() {
//         const { lng, lat, zoom } = this.state;
//         const map = new mapboxgl.Map({
//             container: this.mapContainer.current,
//             style: 'mapbox://styles/mapbox/satellite-v9',
//             // style: 'mapbox://styles/mapbox/streets-v11',
//             center: [lng, lat],
//             zoom: zoom
//         });
//     }

//     render() {
//         return (
//             <View style={{ alignItems: 'center', paddingBottom: 10, width: '100%'}}>
//                 <View ref={this.mapContainer} style={{ width: '100%' }} />
//             </View>
//         );
//     }
// }

const WebPackContainer = ({cords}) => {
  console.log('kjahsdkjashdkjsadh   webview',cords)
  useEffect(() => {
    // temporary solution to fix mapbox-gl-js missing css error
    if (Platform.OS === "web") {
      // inject mapbox css into head
      const link = document.createElement("link");
      link.href = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // inject mapbox js into head
      const script = document.createElement("script");
      script.src = "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(cords?.lon ? cords?.lon: -70);
  const [lat, setLat] = useState(cords?.lat ? cords?.lat : 0);
  const [zoom, setZoom] = useState(10);

  const shape = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [-77.044211, 38.852924],
            [-77.045659, 38.860158],
            [-77.044232, 38.862326],
            [-77.040879, 38.865454],
            [-77.039936, 38.867698],
            [-77.040338, 38.86943],
            [-77.04264, 38.872528],
            [-77.03696, 38.878424],
            [-77.032309, 38.87937],
            [-77.030056, 38.880945],
            [-77.027645, 38.881779],
            [-77.026946, 38.882645],
            [-77.026942, 38.885502],
            [-77.028054, 38.887449],
            [-77.02806, 38.892088],
            [-77.03364, 38.892108],
            [-77.033643, 38.899926],
          ],
        },
      },
    ],
  };

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      // style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    mapInstance.on("load", () => {
      mapInstance.addSource("trail", {
        type: "geojson",
        data: shape,
      });

      mapInstance.addLayer({
        id: "trail",
        type: "line",
        source: "trail",
        paint: {
          "line-color": "#FF0000",
          "line-width": 2,
        },
      });

      const marker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapInstance);

      // Add event listener for marker movement
      mapInstance.on("move", () => {
        const { lng, lat } = mapInstance.getCenter();

        setLng(lng.toFixed(4));
        setLat(lat.toFixed(4));
        setZoom(mapInstance.getZoom().toFixed(2));
      });

      map.current = mapInstance;
    });

    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View ref={mapContainer} style={styles.map} />
    </View>
    // <div style={styles.container}>
    //   <div ref={mapContainer} style={styles.map} />;
    // </div>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 'auto',
    alignItems: "center",
    justifyContent: "center",
    // position: "relative",
    height: "100%",
    width: "100%",
  },
  map: {
    width: "100%",
    minHeight: "100%",
  },
});

export default WebPackContainer;
