import Destination from '../models/destinationModel.js';

export const postDestination = async (req, res) => {
  const { name, type, reference, onModel } = req.body;
  
  if (!name || !type || !reference || !onModel) {
    res.status(400).send({ message: "Invalid request parameters" });
    return; // Return early to avoid further execution
  }

  try {
    const newDestination = new Destination({ 
      name: name,
      type: type,
      reference: reference,
      onModel: onModel
    });

    await newDestination.save();

    res.status(201).json({
      status: "success",
      data: {
        newDestination,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getDestination = async (req, res) => {
    try {
      const id = req.params.id;
      let destination = await Destination.findById(id).populate('reference');
  
      if (!destination) {
        return res.status(404).json({
          status: "fail",
          message: "No destination found with that ID",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          destination: destination,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
  