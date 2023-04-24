import React, { useEffect, useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, PermissionsAndroid, Permission } from "react-native";

import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

// get mapbox access token from .env file
import { MAPBOX_ACCESS_TOKEN } from "@env";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../theme";
import { Link } from "expo-router";
import { CheckIcon, Select } from "native-base";
import WebPackconatiner from "./WebMapcontainer";

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

// MapboxGL.setConnected(true);

console.log("Mapbox:", Mapbox);
console.log("Mapbox.MapView:", Mapbox?.MapView);


export function CustomizedMap() {

  const mapViewRef = useRef(null);

  const [style, setStyle] = React.useState("mapbox://styles/mapbox/outdoors-v11");
  const [location, setLocation] = useState(null);
  console.log("location", location);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  useEffect(async () => {

    await Mapbox.offlineManager.createPack(
      {
        name: 'field-1', // any
        bounds: [[32.23782523101579, 46.39912398458027], [33.43887899585923, 47.041693870480955]],
        styleURL: Mapbox.StyleURL.Satellite,
        minZoom: 10,
        maxZoom: 12,
      },
      (pack, status) => {
        console.log('>>>>>>>>>>pack progress', pack.name, status.percentage, status.completedTileCount);
      },
      (pack, error) => {
        console.log('>>>>>>>>>>pack error', pack.name, error);
      },
    );

    console.log(await Mapbox.offlineManager.getPacks());

  }, [])

  const [lng, setLng] = useState(103.8519599);
  const [lat, setLat] = useState(1.29027);

  const [mapViewLoaded, setMapViewLoaded] = useState(false);

  function handleMapViewLayout() {
    setMapViewLoaded(true);
    
  }

  const handleStyleChange = (value) => {
    setStyle(value);
  };

  function getShapeSourceBounds(shape) {
    let minLng = Infinity;
    let maxLng = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    shape.features[0].geometry.coordinates.forEach(coord => {
      const lng = coord[0];
      const lat = coord[1];

      if (lng < minLng) {
        minLng = lng;
      }
      if (lng > maxLng) {
        maxLng = lng;
      }
      if (lat < minLat) {
        minLat = lat;
      }
      if (lat > maxLat) {
        maxLat = lat;
      }
    });

    return [[minLng, minLat], [maxLng, maxLat]];
  }

  const [shapeSourceBounds, setShapeSourceBounds] = useState(null);

  function handleShapeSourceLoad() {
    const shape = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'LineString',
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
      }],
    };

    const bounds = getShapeSourceBounds(shape);

    mapViewRef?.current?.fitBounds(bounds, {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
      }
    }, () => {
      const centerLng = (bounds[0][0] + bounds[1][0]) / 2;
      const centerLat = (bounds[0][1] + bounds[1][1]) / 2;

      mapViewRef.current.setCamera({
        centerCoordinate: [centerLng, centerLat],
        minZoomLevel: 10,
      });
    });

    console.log('shape:', shape);
    console.log('bounds:', bounds);
    console.log('mapViewRef:', mapViewRef);
  }


  // function handleMapIdle() {
  //   if (shapeSourceBounds) {
  //     mapViewRef.current.setCamera({
  //       centerCoordinate: mapViewRef.current.getCenter(),
  //       zoomLevel: Math.min(
  //         mapViewRef.current.zoomLevel,
  //         mapViewRef.current.getZoomForBounds(shapeSourceBounds, { padding: 50 })
  //       )
  //     });
  //   }
  // }

  function handleShapePress(event) {
    // Get the ID of the clicked feature
    const featureId = event.features[0].id;

    // Do something with the ID, e.g. display an info window
    console.log(`Shape with ID ${featureId} was clicked!`);
  }

  const handleButtonPress = () => {
    // Add your desired action here
  };

  return (
    <View style={{ flex: 1, borderRadius: 30, overflow: 'hidden' }}>
      <Select selectedValue={style} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
        bg: "teal.600",
        endIcon: <CheckIcon size="5" />
      }} mt={1} onValueChange={itemValue => setStyle(itemValue)}>
        <Select.Item label="mapbox://styles/mapbox/dark-v10" value="mapbox://styles/mapbox/dark-v10" />
        <Select.Item label="mapbox://styles/mapbox/light-v10" value="mapbox://styles/mapbox/light-v10" />
        <Select.Item label="mapbox://styles/mapbox/outdoors-v11" value="mapbox://styles/mapbox/outdoors-v11" />
        <Select.Item label="mapbox://styles/mapbox/satellite-v9" value="mapbox://styles/mapbox/satellite-v9" />
        <Select.Item label="mapbox://styles/mapbox/satellite-streets-v11" value="mapbox://styles/mapbox/satellite-streets-v11" />
        <Select.Item label="mapbox://styles/mapbox/streets-v11" value="mapbox://styles/mapbox/streets-v11" />
      </Select>

      <Mapbox.MapView
        style={{ flex: 1 }}
        // styleURL={style}
        // zoomLevel={10}
        // centerCoordinate={[lng, lat]}
        x={0}
        y={0}
        onLayout={handleMapViewLayout}
        // compassEnabled={true}
        // logoEnabled={false}

        // onMapIdle={handleMapIdle}
        ref={mapViewRef}
      >
        <Mapbox.Camera
          centerCoordinate={[-77.035, 38.875]}

        // zoomLevel={12}
        />

        <Mapbox.PointAnnotation
          coordinate={[-77.044211, 38.852924]}
          id="pt-ann"
          title={'this is a point annotation'}
        >
        </Mapbox.PointAnnotation>

        <Mapbox.MarkerView id={'test-marker'} coordinate={[-77.044211, 38.852924]}>
          <Mapbox.PointAnnotation id={'test-marker-pointer'} title={'this is a marker view'} coordinate={[-77.044211, 38.852924]} />
        </Mapbox.MarkerView>

        <Mapbox.UserLocation
          visible={true}
          androidRenderMode={'compass'}
          showsUserHeadingIndicator={true}
          onUpdate={newLocation => {
            console.log(newLocation)
          }}
        />

        <Mapbox.ShapeSource
          id="source1"
          lineMetrics={true}
          shape={{
            type: 'Feature',
            geometry: {
              type: 'LineString',
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
          }}
          onPress={handleShapePress}
          onLoad={handleShapeSourceLoad}
        >
          <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
        </Mapbox.ShapeSource>
        <View style={styles.button}>
          <Link href={'/map'}>
            <MaterialCommunityIcons
              name="arrow-expand"
              size={30}
              color={theme.colors.text}
            />
          </Link>
        </View>

      </Mapbox.MapView>
    </View>
  );
}

export function MapContainer() {
  if (Platform.OS === "web") {
    return (
      <View >
        <WebPackconatiner />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Map - Customized</Text>
      <CustomizedMap />

    </View>
  );

}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: 300,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,

  },
  map: {
    flex: 1,
  },
  lineLayer: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
