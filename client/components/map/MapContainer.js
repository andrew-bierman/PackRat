import React, { useEffect, useState, useRef } from "react";
import { Platform, StyleSheet, Text, View, Picker, TouchableOpacity, Dimensions, Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';
// import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from "@expo/vector-icons";
import MapView from '@rnmapbox/maps';
import { offlineManager, Camera } from '@rnmapbox/maps';
import { Select, Center, Box, CheckIcon } from "native-base";
// get mapbox access token from .env file
import { MAPBOX_ACCESS_TOKEN } from "@env";

MapView.setAccessToken(MAPBOX_ACCESS_TOKEN);

const dw = Dimensions.get('screen').width;
const dh = Dimensions.get('screen').height

// MapView.setConnected(true);

export function BasicMap() {
  return (
    <View style={{ flex: 1 }}>
      <MapView.MapView style={{ flex: 1 }} />
    </View>
  );
}

export function CustomizedMap() {
  const camera = useRef(null);
  const mapViewRef = useRef(null);
  const mapViewFullScreenRef = useRef();

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
  const [zoomLevel, setZoomLevel] = useState(10.5);
  const [mapFullscreen, setMapFullscreen] = useState(true);
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const trail = {
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
  }
  const optionsForDownload = {
    name: 'Downlaod',
    styleURL: 'mapbox://styles/mapbox/outdoors-v11',
    bounds: [
      trail.geometry.coordinates[0],
      trail.geometry.coordinates[trail.geometry.coordinates.length - 1]
    ],
    minZoom: 10,
    maxZoom: 20,
  };

  useEffect(() => {
    getPosition();
  }, [])

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
    onMapLoaded();
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
    console.log(bounds, "boundssss")

    mapViewFullScreenRef.fitBounds(bounds, {
      edgePadding: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      }
    });

    mapViewFullScreenRef.current.setCamera({
      centerCoordinate: mapViewFullScreenRef.current.getCenter(),
      zoomLevel: Math.min(
        mapViewFullScreenRef.current.zoomLevel,
        mapViewFullScreenRef.current.getZoomForBounds(bounds, { padding: 50 })
      )
    });
  }


  function handleMapIdle() {
    if (trail) {
      mapViewRef.current.setCamera({
        centerCoordinate: mapViewRef.current.getCenter(),
        zoomLevel: Math.min(
          mapViewRef.current.zoomLevel,
          mapViewRef.current.getZoomForBounds(trail, { padding: 50 })
        )
      });
    }
  }

  function handleShapePress(event) {
    // Get the ID of the clicked feature
    const featureId = event.features[0].id;

    // Do something with the ID, e.g. display an info window
    console.log(`Shape with ID ${featureId} was clicked!`);
  }

  function onMapLoaded() {
    // const bounds = MapView.geoUtils.bbox(trail);
    // console.log(bounds,"ssss")
    // mapRef.current.fitBounds(bounds, 50, 1000);

    // mapViewFullScreenRef.current.fitBounds(bounds, 50, 1000);

    // const boundsZoom = bounds.getZoomLevel(); // <-- this method doesn't exists, that's my wish

    // console.log(boundsZoom, "bbbbbb")
    // mapViewFullScreenRef.flyTo({
    //   zoom: boundsZoom
    // });


    // const bounds = new MapView.LngLatBounds();
    // trail.forEach(coord => bounds.extend(coord));

    // const { width, height } = mapViewFullScreenRef.getContainer();
    // const padding = 50; // adjust as needed
    // const zoom = mapViewFullScreenRef.getBoundsZoom(bounds, { width, height, padding });

    // // adjust the zoom level if necessary
    // const minZoom = 5; // adjust as needed
    // const maxZoom = 16; // adjust as needed
    // const adjustedZoom = Math.max(minZoom, Math.min(maxZoom, zoom));
    // Calculate the bounds of the trail
    // const mp =  MapView.LngLatBounds()

    // const mapp = new MapView.LngLatBounds(trail[0], trail[0])
    // const bounds = trail.reduce(
    //   (bounds, coord) => bounds.extend(coord),
    //   MapView.LngLatBounds(trail[0], trail[0])
    // );

    // // Fit the bounds of the trail to the viewport
    // mapViewFullScreenRef.fitBounds(bounds, {
    //   padding: 50, // Optional padding around the bounds
    // });

    // Calculate the bounds of the trail
    // const bounds = trail.reduce(
    //   (bounds, coord) => bounds.extend(coord),
    //   new mapboxgl.LngLatBounds(trailCoordinates[0], trailCoordinates[0])
    // );

    // // Fit the bounds of the trail to the viewport
    // mapViewFullScreenRef.fitBounds(bounds, {
    //   padding: 50, // Optional padding around the bounds
    // });


  }
  function changeMapStyle() {
    // setMapFullscreen(true)
    // camera?.setCamera({
    //   centerCoordinate: [-77.03696, 38.878424],
    //   zoomLevel: 20
    // });
    const bounds = [[-122.5, 37.5], [-122, 38]]; // replace with your trail's bounds
    mapViewFullScreenRef.current.fitBounds.fitBounds(bounds, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: false,
    }, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      const zoom = mapViewRef.current.getZoom();
    });
  }
  function onDownloadProgress(offlineRegion, offlineRegionStatus) {
    setProgress(offlineRegionStatus.percentage)
    setDownloading(true);
    if (offlineRegionStatus.percentage == 100) {
      setDownloading(false)
    }
  }
  function errorListener(offlineRegion, error) {
    Alert.alert(error)
  }

  function onDownload() {
    // start download
    offlineManager.createPack(
      optionsForDownload,
      onDownloadProgress,
      errorListener,
    ).catch((error) => {
      console.log(error, "erroryy")
      Alert.alert(error.message)
    })
  }



  return (
    <View style={{ flex: 1 }}>
      {
        mapFullscreen && (
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
        )
      }
      {
        !mapFullscreen ?
          (
            <View style={{ height: 220, width: '90%', alignSelf: 'center' }}>
              <MapView.MapView
                ref={mapViewRef}
                style={{ flex: 1, borderRadius: 15, overflow: 'hidden' }}
                styleURL={style}
                zoomLevel={zoomLevel}
                centerCoordinate={[-77.03696, 38.878424]}
                onLayout={handleMapViewLayout}
                onDidFinishRenderingMapFully={onMapLoaded}
                compassEnabled={false}
                logoEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                {/* // user location */}
                <MapView.Camera
                  zoomLevel={zoomLevel}
                  centerCoordinate={[-77.03696, 38.878424]}
                  animationMode={'flyTo'}
                  animationDuration={2000}
                />
                <MapView.PointAnnotation
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
                </MapView.PointAnnotation>
                {/* trail */}
                <MapView.ShapeSource
                  id="source1"
                  lineMetrics={true}
                  shape={trail}
                  onPress={handleShapePress}
                  // onLoad={handleShapeSourceLoad}
                  cluster
                  clusterRadius={80}
                  clusterMaxZoomLevel={14}
                >
                  <MapView.LineLayer id="layer1" style={styles.lineLayer} />
                </MapView.ShapeSource>
              </MapView.MapView>
              {/* to come in fullscreen btn which is absolute */}
              <TouchableOpacity
                style={[styles.headerBtnView, { width: 40, height: 40, position: 'absolute', bottom: 10, right: 10 }]}
                onPress={() => changeMapStyle()}
              >
                <Entypo
                  name="resize-full-screen"
                  size={21}
                  color={"grey"}
                />
              </TouchableOpacity>
            </View>
          )
          :
          (
            <View>
              <View style={{ height: 360, width: '100%', alignSelf: 'center' }}>
                <MapView.MapView
                  ref={mapViewFullScreenRef}
                  style={{ flex: 1 }}
                  styleURL={style}
                  // zoomLevel={zoomLevel}
                  // centerCoordinate={[location.longitude, location.latitude]}
                  // onLayout={onMapLoaded}
                  onDidFinishLoadingMap={handleShapeSourceLoad}
                  compassEnabled={false}
                  logoEnabled={false}
                  zoomEnabled={true}
                >
                  {/* // user location */}
                  <MapView.Camera
                    ref={camera}
                  // zoomLevel={zoomLevel}
                  // centerCoordinate={[-77.03696, 38.878424]}
                  // animationMode={'flyTo'}
                  // animationDuration={2000}

                  />
                  <MapView.PointAnnotation
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
                  </MapView.PointAnnotation>
                  {/* trail */}
                  <MapView.ShapeSource
                    id="source1"
                    lineMetrics={true}
                    shape={trail}
                    onPress={handleShapePress}
                    // onLoad={handleShapeSourceLoad}
                    cluster
                    clusterRadius={80}
                    clusterMaxZoomLevel={14}
                  >
                    <MapView.LineLayer
                      id="layer1"
                      style={styles.lineLayer}
                      lineDasharray={[1, 2]} // set the dash array pattern here
                      lineDashOffset={0}
                    />
                  </MapView.ShapeSource>
                </MapView.MapView>
                {/* to come in fullscreen btn which is absolute */}
                <TouchableOpacity
                  style={[styles.headerBtnView, { width: 45, height: 45, position: 'absolute', bottom: 10, left: 10 }]}
                  onPress={() => changeMapStyle()}
                >
                  <MaterialCommunityIcons
                    name="navigation-variant-outline"
                    size={25}
                    color={"black"}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.headerBtnView, { flexDirection: 'row', width: '88%', height: 46, marginVertical: 10, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }]}
                onPress={() => onDownload()}
                disabled={downloading}
              >
                <Text style={{ fontSize: 16, color: 'white' }}>{downloading ? "Downloading" : "Download Map"}</Text>
                {downloading && <Text style={{ backgroundColor: 'white', color: 'blue', paddingHorizontal: 3, marginHorizontal: 7, minWidth: 20 }}>{progress}</Text>}
              </TouchableOpacity>
            </View>
          )
      }
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
    <View style={[styles.container]}>
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
    // height: 500,
    width: '100%',
    backgroundColor: "white",
    marginBottom: 20
  },
  lineLayer: {
    lineColor: '#16b22d',
    lineWidth: 4,
    lineOpacity: 1,
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
    backgroundColor: 'white',
  },
});
