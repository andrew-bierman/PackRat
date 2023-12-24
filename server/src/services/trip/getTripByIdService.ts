import { Trip } from "../../drizzle/methods/Trip";

export const getTripByIdService = async (tripId: string) =>{
  const tripClass = new Trip();
  try{
    const trip = await tripClass.findById(tripId);
    return trip;
  }
  catch(error){
    console.error(error);
    throw new Error('Trip cannot be found');
  }
}
