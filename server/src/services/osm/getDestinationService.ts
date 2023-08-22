import Way from "../../models/osm/wayModel";
import Node from "../../models/osm/nodeModel";

/**
 * Retrieves the destination service based on the given ID.
 *
 * @param {string} id - The ID of the destination service.
 * @return {Promise<any>} A promise that resolves to the destination service.
 */
export const getDestinationService = async (id) => {
    let destination = await Way.findById(id);
  
    // If not found in Way, search in Node
    if (!destination) {
      destination = await Node.findById(id);
    }
  
    return destination;
  };