import axios from 'axios'
import osmtogeojson from 'osmtogeojson';

export const getOsm = async (req, res) => {
    let { query } = req.body
    const overpassUrl = process.env.OSM_URI
    try {
        const response = await axios.post(overpassUrl, query);

        if (response.status === 200) {
            const geojsonData = osmtogeojson(response.data);
            res.send(geojsonData);
        } else {
            res.send({ message: "Went wrong" });
        }
    } catch (error) {
        res.send({ message: "Went wrong" });
    }
}