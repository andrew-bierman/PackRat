import React, { useEffect, useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";
import Geolocation from '@react-native-community/geolocation';
// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";

import Mapbox, { Camera } from '@rnmapbox/maps';
import { Select, Center, Box, CheckIcon } from "native-base";

// get mapbox access token from .env file
import { MAPBOX_ACCESS_TOKEN } from "@env";

Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

// MapboxGL.setConnected(true);

export function BasicMap() {
  return (
    <View style={{ flex: 1 }}>
      <Mapbox.MapView style={{ flex: 1 }} />
    </View>
  );
}

export function CustomizedMap() {
  const mapViewRef = useRef(null);
  const [style, setStyle] = React.useState("mapbox://styles/mapbox/outdoors-v11");
  const [location, setLocation] = useState({
    longitude: 0.0,
    latitude: 0.0
  });
  const [getLocationLoading, setGetLocationLoading] = useState(false);
  const [correctLocation, setCorrectLocation] = useState(false);
  const [lng, setLng] = useState(103.8519599);
  const [lat, setLat] = useState(1.29027);
  const [mapViewLoaded, setMapViewLoaded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const camera = useRef < Camera > (null);

  useEffect(() => {
    // checkLocationPermission();
    getPosition();
    camera?.current?.fitBounds(
      [73.0830166, 33.6520823],
      [73.10290381912782, 33.71357474387622],
      [73.13841825639065, 33.66768551893553],
      [73.13178588519571, 33.6829950623184,],
      [73.14877138751521, 33.68605276457886,],
      [73.16719136955601, 33.69309467710133],
    );
  }, []);

  const getPosition = () => {
    Geolocation.getCurrentPosition((data) => {
      setLocation({
        ...location,
        longitude: Number(data.coords.longitude),
        latitude: Number(data.coords.latitude)
      })
      setCorrectLocation(true)
    }, (error) => {
      setCorrectLocation(false)
      Alert.alert("Something went wrong with location", error.message)
    }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
  }
  const goToMyLocation = () => {
    setGetLocationLoading(true);
    Geolocation.getCurrentPosition((data) => {
      setLocation({
        ...location,
        longitude: Number(data.coords.longitude),
        latitude: Number(data.coords.latitude)
      })
      setCorrectLocation(true)
    }, (error) => {
      if (!mountedRef.current) return null
      setCorrectLocation(false)
      Alert.alert("Something went wrong with current location", error.message)
    }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })

    try {
      if (correctLocation) {
        mapViewRef?.current.flyTo([location.longitude, location.latitude]);
        mapViewRef?.current.setCamera({
          centerCoordinate: [location.longitude, location.latitude],
          zoomLevel: 13,
          animationDuration: 3000,
        });
      }
    }
    catch (error) {
      console.log("error in catch", error)
    }
  }
  const onPressMap = (item) => {
    setLocation({
      ...location,
      longitude: item.geometry.coordinates[0],
      latitude: item.geometry.coordinates[1],
    })
  };

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

    mapViewRef.current.fitBounds(bounds, {
      edgePadding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    });

    mapViewRef.current.setCamera({
      centerCoordinate: mapViewRef.current.getCenter(),
      zoomLevel: Math.min(
        mapViewRef.current.zoomLevel,
        mapViewRef.current.getZoomForBounds(bounds, { padding: 50 })
      )
    });
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
  console.log(location, "location")

  return (
    <View style={{ flex: 1 }}>
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

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={style}
          zoomLevel={zoomLevel}
          centerCoordinate={[location.longitude, location.latitude]}
          // centerCoordinate={[lng, lat]}
          x={0}
          y={0}
          onLayout={handleMapViewLayout}
          compassEnabled={true}
          logoEnabled={false}
          // onMapIdle={handleMapIdle}
          ref={mapViewRef}
          onPress={correctLocation ? onPressMap : null}
          zoomEnabled={true}
         
        >
          <Mapbox.Camera
            zoomLevel={zoomLevel}
            centerCoordinate={[location.longitude, location.latitude]}
            animationMode={'flyTo'}
            animationDuration={2000}
            zoomEnabled={true}
            bounds={true}
          />
          <Mapbox.PointAnnotation
            id={"1212"}
            coordinate={[location.longitude, location.latitude]}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <MaterialCommunityIcons
                name="map-marker"
                size={35}
                color={"#de0910"}
              />
            </View>
          </Mapbox.PointAnnotation>

          <Mapbox.ShapeSource
            id="source1"
            lineMetrics={true}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [73.0830166, 33.6520823],
                  [73.10290381912782, 33.71357474387622],
                  [73.13841825639065, 33.66768551893553],
                  [73.13178588519571, 33.6829950623184,],
                  [73.14877138751521, 33.68605276457886,],
                  [73.16719136955601, 33.69309467710133]
                  // [-77.044232, 38.862326],
                  // [-77.040879, 38.865454],
                  // [-77.039936, 38.867698],
                  // [-77.040338, 38.86943],
                  // [-77.04264, 38.872528],
                  // [-77.03696, 38.878424],
                  // [-77.032309, 38.87937],
                  // [-77.030056, 38.880945],
                  // [-77.027645, 38.881779],
                  // [-77.026946, 38.882645],
                  // [-77.026942, 38.885502],
                  // [-77.028054, 38.887449],
                  // [-77.02806, 38.892088],
                  // [-77.03364, 38.892108],
                  // [-77.033643, 38.899926],
                ],
              },
            }}
            onPress={handleShapePress}
            onLoad={handleShapeSourceLoad}
            cluster
            clusterRadius={80}
            clusterMaxZoomLevel={14}

          >
            <Mapbox.LineLayer id="layer1" style={styles.lineLayer} />
          </Mapbox.ShapeSource>

        </Mapbox.MapView>
        <TouchableOpacity
          style={[styles.headerBtnView, { width: 45, height: 45, position: 'absolute', right: 8 }]}
          onPress={() => goToMyLocation()}
        >
          <MaterialIcons
            name="my-location"
            size={23}
            color={"white"}
          />
        </TouchableOpacity>
        <View style={{ position: 'absolute', left: 6, position: 'absolute', left: 6 }}>
          <TouchableOpacity
            style={[styles.headerBtnView, { width: 45, height: 45, marginTop: 10 }]}
            onPress={() => {
              setZoomLevel(zoomLevel + 1)
            }}
          >
            <Entypo
              name="plus"
              size={23}
              color={"white"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerBtnView, { width: 45, height: 45, marginTop: 10 }]}
            onPress={() => {
              setZoomLevel(zoomLevel - 1)
            }}
          >
            <Entypo
              name="minus"
              size={23}
              color={"white"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function MapContainer() {
  if (Platform.OS === "web") {
    return (
      <View style={styles.page}>
        <Text>
          Mapbox maps are not supported on web yet.
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
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
    height: 500,
    width: '100%',
    backgroundColor: "tomato",
    marginBottom: 20
  },
  map: {
    flex: 1,
  },
  lineLayer: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  headerView: {
    position: 'absolute',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 100,
  },
  headerBtnView: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
