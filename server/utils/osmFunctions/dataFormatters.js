import Way from "../../models/osm/wayModel.js";
import Node from "../../models/osm/nodeModel.js";

export const extractIdAndType = (string) => {
  // console.log("string", string)
  if (string.includes("/")) {
    let [type, idString] = string.split("/");

    const idNumber = Number(idString);

    return { type, id: idNumber };
  } else {
    return { type: "node", id: string };
  }
};

// Determine if data is in OSM format
export function isOSMFormat(data) {
  return data && data.type && data.id && data.tags && data.nodes;
}

// Determine if data is in GeoJSON format
export function isGeoJSONFormat(data) {
  return data && data.type === "Feature" && data.geometry && data.properties;
}

export function propertiesToTags(properties) {
  if (!properties) {
    console.error("properties is undefined or null");
    return {};
  }
  if (typeof properties !== "object" || properties === null) {
    throw new Error("Properties should be an object");
  }
  // console.log("properties in propertiesToTags", properties);
  const tags = {};
  for (let [k, v] of Object.entries(properties)) {
    tags[k] = v;
  }
  return tags;
}
