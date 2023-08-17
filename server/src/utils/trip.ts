import Trip from "../models/tripModel";

export const tripValidation = async ({
  name,
  duration,
  weather,
  start_date,
  end_date,
  destination,
  owner_id,
  packs,
  is_public,
}: any) => {
  if (
    !name ||
    !duration ||
    !weather ||
    !start_date ||
    !end_date ||
    !destination ||
    !owner_id ||
    !packs ||
    !is_public
  ) {
    throw new Error("All fields must be filled");
  }

  const trip = await Trip.create({
    name,
    duration,
    weather,
    start_date,
    end_date,
    destination,
    owner_id,
    packs,
    is_public,
  });

  return trip;
};
