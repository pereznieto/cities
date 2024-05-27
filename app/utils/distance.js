export const getRealCoordinates = (mapSize, currentCity) => ({
  x: longitudeToX(mapSize.width, currentCity.longitude),
  y: latitudeToY(mapSize.height, currentCity.latitude),
});

export const yToLatitude = (height, y) => {
  const mapEquator = height * (9 / 15);
  return ((mapEquator - y) * 90) / mapEquator;
};

export const xToLongitude = (width, x) => {
  const mapGreenwich = width / 2;
  return ((x - mapGreenwich) * 180) / mapGreenwich;
};

export const latitudeToY = (height, latitude) => {
  const mapEquator = height * (9 / 15);
  return parseInt(mapEquator - (latitude * mapEquator) / 90);
};

export const longitudeToX = (width, longitude) => {
  const mapGreenwich = width / 2;
  return parseInt((longitude * mapGreenwich) / 180 + mapGreenwich);
};

export const getDistanceBetweenTwoCoordinates = (
  { latitude: lat1, longitude: lon1 },
  { latitude: lat2, longitude: lon2 }
) => {
  const earthDiameter = 12742;
  const rad = 0.017453292519943295;
  const cos = Math.cos;

  return (
    earthDiameter *
    Math.asin(
      Math.sqrt(
        0.5 -
          cos((lat2 - lat1) * rad) / 2 +
          (cos(lat1 * rad) * cos(lat2 * rad) * (1 - cos((lon2 - lon1) * rad))) / 2
      )
    )
  );
};

export const getLineBetweenTwoPoints = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  const height = 2;
  const width = getDistanceBetweenTwoPoints(x1, y1, x2, y2);
  const angle = getAngleBetweenTwoPoints(x1, y1, x2, y2);
  const centre = getCentreBetweenTwoPoints(x1, y1, x2, y2, width, height);

  return {
    width,
    height: `${height}px`,
    left: `${centre.x}px`,
    top: `${centre.y}px`,
    transform: `rotate(${angle}deg)`,
  };
};

const getDistanceBetweenTwoPoints = (x1, y1, x2, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const getAngleBetweenTwoPoints = (x1, y1, x2, y2) =>
  Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

const getCentreBetweenTwoPoints = (x1, y1, x2, y2, length, thickness) => ({
  x: (x1 + x2) / 2 - length / 2,
  y: (y1 + y2) / 2 - thickness / 2,
});
