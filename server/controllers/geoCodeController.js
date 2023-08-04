import fetch from "node-fetch";
import { oneEntity } from "../utils/oneEntity.js";

export const getGeoCode = async (req, res) => {
  try {
    const addressArray = req.query.addressArray;

    if (!addressArray) {
      return res.status(400).json({ message: "Address array is required" });
    }

    const transformedAddress = addressArray.split(", ").join("%20").split(" ").join("%20");

    const GEO_CODE_URL = process.env.GEO_CODE_URL;
    const GEOAPIFY_KEY = process.env.GEOAPIFY_KEY;

    const queryParams = `?text=${transformedAddress}&apiKey=${GEOAPIFY_KEY}`;
    const url = GEO_CODE_URL + queryParams;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ message: "Error fetching GeoCode" });
    }

    const result = await response.json();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching GeoCode", error: error.message });
  }
};
