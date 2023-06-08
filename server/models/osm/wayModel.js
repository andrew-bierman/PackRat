import mongoose from "mongoose";
import Node from "./nodeModel.js";
import myDB from "../dbConnection.js";

const { Schema } = mongoose;

const WaySchema = new Schema({
  osm_id: Number, // the OSM ID
  osm_type: String, // the OSM type (way, node, relation)
  tags: { type: Map, of: String }, // tags as a map
  nodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Node",
    },
  ],
  geoJSON: Object, // geoJSON representation of the way
  updated_at: Date, // last update from OSM
});

WaySchema.pre("save", async function (next) {
  // Populate geoJSON from tags and nodes before saving
  try {
    this.geoJSON = await this.toGeoJSON();
    next();
  } catch (err) {
    next(err);
  }
});

WaySchema.method("toGeoJSON", function () {
  const geoJSON = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [],
    },
    properties: {},
  };

  console.log('toGeoJSON')
  console.log('this.tags', this.tags);

  // Populate properties from tags
  for (let [k, v] of this.tags) {
    console.log('k', k)
    console.log('v', v)
    geoJSON.properties[k] = v;
  }

  // Convert nodes to coordinates
  this.nodes.forEach((node) => {
    geoJSON.geometry.coordinates.push([node.lon, node.lat]);
  });

  // Set the id and osm_type
  geoJSON.id = this.osm_type + "/" + this.id;

  console.log('final geoJSON', geoJSON)

  return geoJSON;
});



WaySchema.statics.fromOSM = async function (way) {
  const wayData = {
    osm_id: Number(way.id.split("/")[1]),
    tags: way.tags,
    updated_at: way.timestamp,
  };

  // Find or create nodes
  const nodeIds = way.nodes.map((node) => node.id);
  const nodes = await this.model("Node").findOrCreateMany(nodeIds, way.nodes);

  // Add nodes to way
  wayData.nodes = nodes.map((node) => node._id);

  // Create way
  const newWay = await this.create(wayData);

  return newWay;
};

WaySchema.statics.fromGeoJSON = async function (geoJSON) {
  const way = new this(); // Create a new Way
  way.tags = new Map(); // Initialize tags to a new Map

  // Extract OSM ID and type from properties, if available
  if (geoJSON.id) {
    let splitId = geoJSON.id.split("/");
    way.osm_type = splitId[0]; // Set the type
    way.osm_id = Number(splitId[1]); // Set the id
  }

  // Convert properties to tags
  for (let [k, v] of Object.entries(geoJSON.properties)) {
    way.tags.set(k, v);
  }

  // Convert coordinates to nodes
  if (geoJSON.geometry.type === 'Point') {
    const [lon, lat] = geoJSON.geometry.coordinates;
    const node = new Node({ lon, lat });
    await node.save();
    way.nodes.push(node._id);
  } else if (geoJSON.geometry.type === 'LineString') {
    await Promise.all(
      geoJSON.geometry.coordinates.map(async ([lon, lat]) => {
        const node = new Node({ lon, lat });
        await node.save();
        way.nodes.push(node._id);
      })
    );
  } else {
    // handle other geometry types if needed
  }

  // Set the GeoJSON representation
  way.geoJSON = way.toGeoJSON(); // directly call without await

  // Save and return the new Way
  await way.save();
  return way;
};




WaySchema.statics.findOrCreateManyFromOSM = async function (wayIds, ways) {
  const existingWays = await this.find({ id: { $in: wayIds } });
  const existingWayIds = existingWays.map((way) => way.id);
  const newWayIds = wayIds.filter((id) => !existingWayIds.includes(id));
  const newWays = await Promise.all(
    ways
      .filter((way) => newWayIds.includes(way.id))
      .map(async (way) => await this.fromOSM(way))
  );
  return [...existingWays, ...newWays];
};

WaySchema.statics.findOrCreateManyFromGeoJSON = async function (geoJSON) {
  console.log("findOrCreateManyFromGeoJSON", geoJSON);

  const ways = await Promise.all(
    geoJSON.features.map(async (feature) => {
      console.log("Processing feature:", feature.id);
      console.log("Geometry type:", feature.geometry.type);
      console.log("Geometry coordinates:", JSON.stringify(feature.geometry.coordinates, null, 2));
      
      let way;

      const osm_type = feature.id.split("/")[0];
      const osm_id = feature.id.split("/")[1];

      console.log("osm_type:", osm_type);
      console.log("id:", osm_id);
      console.log('typeof id:', typeof osm_id)
     

      const existingWay = await this.findOne({ osm_id, osm_type });

      if (existingWay) {
        // update existing way
        way = await this.findByIdAndUpdate(existingWay._id, feature, {
          new: true,
        });
      } else {
        // create new way
        way = await this.fromGeoJSON(feature);
      }
      return way;
    })
  );
  return ways;
};


const Way = myDB.model("Way", WaySchema);

export default Way;
