import Way from "../../models/osm/wayModel.ts";
import Node from "../../models/osm/nodeModel.ts";

export const getDestinationService = async (id) => {
    let destination = await Way.findById(id);
  
    // If not found in Way, search in Node
    if (!destination) {
      destination = await Node.findById(id);
    }
  
    return destination;
  };