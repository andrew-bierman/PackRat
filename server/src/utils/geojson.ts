export const validateGeojsonId = (geojsonId: string) => {
  const pattern = /^(way|node|relation)\/\d+$/;
  const regex = new RegExp(pattern);
  return regex.test(geojsonId);
};
export const validateGeojsonType = (geojsonType: string) => {
  const pattern = /^Feature$/;
  const regex = new RegExp(pattern);
  return regex.test(geojsonType);
};
