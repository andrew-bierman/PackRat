import osmtogeojson from "osmtogeojson";
import axios from "axios";
import { InvalidRequestParamsError, RetrievingPhotonDetailsError } from "../../helpers/errors";

/**
 * Retrieves Photon details based on the provided ID and type.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} The function does not return anything.
 */
export const getPhotonDetails = async (req, res,next) => {
    let { id, type } = req.params;

    if (!id || !type) {
        next(InvalidRequestParamsError);
    }

    type = type.toLowerCase(); // Standardize osm_type to be lowercase

    switch (type) {
        case "way":
        case "w":
            type = "way";
            break;
        case "node":
        case "n":
            type = "node";
            break;
        case "relation":
        case "r":
            type = "relation";
            break;
        default:
            next(InvalidRequestParamsError);
    }

    const overpassUrl = process.env.OSM_URI;

    const overpassQuery = `[out:json][timeout:25];${type}(${id});(._;>;);out body;`;

    console.log("overpassQuery", overpassQuery);

    try {
        const response = await axios.post(overpassUrl, overpassQuery, {
            headers: { "Content-Type": "text/plain" },
        });

        // console.log("response", response);

        const geojsonData = osmtogeojson(response.data);

        // await updateDatabaseWithGeoJSONDataFromOverpass(geojsonData);

        res.send(geojsonData);
    } catch (error) {
        next(RetrievingPhotonDetailsError)
    }
};