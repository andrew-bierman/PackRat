import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Platform } from 'react-native';
import { Asset } from 'expo-asset';

import { MAPBOX_ACCESS_TOKEN } from '@env';


export function WebMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.4194);
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (Platform.OS === 'web') {
       require('mapbox-gl/dist/mapbox-gl.css');
    //   Asset.fromModule(require('../../assets/mapbox/mapbox-gl.js')).downloadAsync();
    //   Asset.fromModule(require('../../assets/mapbox/mapbox-gl.css')).downloadAsync();

      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
    }
  });

  const renderMap = () => {
    if (Platform.OS === 'web') {
      return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
    } else {
      return (
        // render a different component for non-web platforms
        <Text></Text>
      );
    }
  };

  return renderMap();
}





export function WebMap2() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);


    const [trails, setTrails] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState('all');

    const [loadingTrails, setLoadingTrails] = useState(false);

    const [currentMapStyle, setCurrentMapStyle] = useState('mapbox://styles/mapbox/outdoors-v12');

    // setCurrentMapStyle('mapbox://styles/mapbox/dark-v11')


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: currentMapStyle,
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('moveend', async () => {
            // debouncedUpdateTrails();
            // await updateTrails()
            updateTrailsThrottled2()
        });

        map.current.on('load', async () => {
            const bounds = map.current.getBounds();
            const overpassQuery = buildOverpassQuery(bounds);
            const geojsonData = await overpassAPI(overpassQuery)
                .then((overpassData) => {
                    // updateTrails(geojsonData);
                    // setTrails(geojsonData.features);
                    addTrailsToDropdown(overpassData);
                });

            if (geojsonData) {
                map.current.addSource('trails', {
                    type: 'geojson',
                    data: geojsonData,
                });

                map.current.addLayer({
                    id: 'trails',
                    type: 'line',
                    source: 'trails',
                    paint: {
                        'line-color': '#f08',
                        'line-width': 3,
                    },
                });
            }
        });

        // Clean up the map instance on unmount
        return () => map.current.remove();
    }, []);


    useEffect(() => {
        if (map.current && trails.length > 0 && map.current.isStyleLoaded()) {
            const geojsonData = {
                type: 'FeatureCollection',
                features: trails.map((trail) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: trail.geometry.coordinates,
                    },
                    properties: {
                        id: trail.id,
                        name: trail.name,
                    },
                })),
            };

            if (!map.current.getSource('trails')) {
                map.current.addSource('trails', {
                    type: 'geojson',
                    data: geojsonData,
                });

                map.current.addLayer({
                    id: 'trails',
                    type: 'line',
                    source: 'trails',
                    paint: {
                        'line-color': '#f08',
                        'line-width': 3,
                    },
                });
            } else {
                map.current.getSource('trails').setData(geojsonData); // update the trails on the map
            }


            map.current.getSource('trails').setData({
                type: 'FeatureCollection',
                features: trails.map((trail) => ({
                    type: 'Feature',
                    geometry: trail.geometry,
                    properties: {
                        id: trail.id,
                        name: trail.name,
                    },
                })),
            });


        }
    }, [trails]);

    // useEffect(() => {
    //   if (selectedTrail === "all") {
    //     map.current.setFilter("trails", null);
    //   } else {
    //     const trail = trails.find((trail) => trail.id === parseInt(selectedTrail));
    //     if (trail) {
    //       map.current.setFilter("trails", ["==", "id", trail.id]);

    //       // Add a marker to the selected trail
    //       const marker = new mapboxgl.Marker({ color: "#f08" })
    //         .setLngLat(trail.geometry.coordinates[0])
    //         .addTo(map.current);
    //     }
    //   }
    // }, [selectedTrail, trails]);





    const buildOverpassQuery = (bounds) => {
        const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
        const query = `
      [out:json];
      (
        way["highway"="path"]["sac_scale"](${bbox});
        relation["route"="hiking"](${bbox});
        relation["route"="ski"](${bbox});
        way["piste:type"](${bbox});
      );
      out body; >; out skel qt;
    `;
        return query;
    };

    const updateTrails = async (trails) => {
        setLoadingTrails(true);

        const bounds = map.current.getBounds();
        const overpassQuery = buildOverpassQuery(bounds);

        const cachedTrailList = cache.get(overpassQuery);
        if (cachedTrailList) {
            console.log('Returning trailList from cache:', cachedTrailList);
            setTrails(cachedTrailList);
            setLoadingTrails(false);
            return;
        }

        try {
            const overpassData = await overpassAPI(overpassQuery);

            console.log('overpassData', overpassData)

            addTrailsToMapAndList(overpassData);

            cache.set(overpassQuery, overpassData);
        } catch (error) {
            console.error(error);
        }

        setLoadingTrails(false);

    };

    const addTrailsToDropdown = (overpassData) => {
        if (overpassData && overpassData.features) {
            const ways = overpassData.features.filter((features) => features.type === 'way');
            const nodes = overpassData.features.filter((features) => features.type === 'node');

            const features = overpassData.features.filter((features) => features.type === 'Feature');

            const nodeMap = nodes.reduce((map, node) => {
                map[node.id] = [node.lon, node.lat];
                return map;
            }, {});

            const trailList = features.map((feature) => ({
                id: feature.id,
                name: feature.properties.name || 'Unnamed Trail',
                geometry: {
                    type: 'LineString',
                    coordinates: feature.geometry.coordinates.map((nodeId) => nodeMap[nodeId]),
                },
            }));

            setTrails(trailList);
            console.log("Trails updated:", trailList);
        }
    };

    const addTrailsToMapAndList = (overpassData) => {

        if (!map.current || !map.current.isStyleLoaded()) return

        if (overpassData && overpassData.features) {
            addTrailsToDropdown(overpassData);
        }

        // cache.set(overpassQuery, trailList);

        if (!map.current.getSource('trails')) {
            map.current.addSource('trails', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],
                },
            });

            map.current.addLayer({
                id: 'trails',
                type: 'line',
                source: 'trails',
                paint: {
                    'line-color': '#f08',
                    'line-width': 3,
                },
            });
        }

        map.current.getSource('trails').setData({
            type: 'FeatureCollection',
            features: trails.map((trail) => ({
                type: 'Feature',
                geometry: trail.geometry,
                properties: {
                    id: trail.id,
                    name: trail.name,
                },
            })),
        });
    }


    const handleTrailSelection = (event) => {
        const selectedValue = event.target.value;

        setSelectedTrail(selectedValue);

        if (selectedValue === "all") {
            map.current.setFilter("trails", null);
        } else {
            const selectedTrail = trails.find((trail) => trail.id === parseInt(selectedValue));

            if (selectedTrail) {
                map.current.setFilter("trails", ["==", "id", selectedTrail.id]);

                // Add a marker to the selected trail
                const marker = new mapboxgl.Marker({ color: "#f08" })
                    .setLngLat(selectedTrail.geometry.coordinates[0])
                    .addTo(map.current);
            }
        }
    };



    const debouncedUpdateTrails = debounce(updateTrails, 500);

    const cache = new LRUCache({ max: 1000 }); // Max cache size of 1000 items

    const throttled = pThrottle(
        {
            limit: 2,
            interval: 1000
        }
    )

    const updateTrailsThrottled2 = throttled(updateTrails);

    // const updateTrailsThrottled = pThrottle(updateTrails, 1, 1000); // Max 1 request per second
    // pThrottle({
    //   limit: 2,
    //   interval: 1000
    // });


    return (
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                <br />

                <label htmlFor="trail-select">Select a trail:</label>
                {trails.length > 0 && (
                    <select id="trail-select" value={selectedTrail} onChange={handleTrailSelection} disabled={loadingTrails}>
                        <option value="all">All Trails</option>
                        {trails.map((trail) => (
                            <option key={trail.id} value={trail.id}>
                                {trail.name}
                            </option>
                        ))}
                    </select>
                )}

                {loadingTrails && <div>Loading trails...</div>}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
