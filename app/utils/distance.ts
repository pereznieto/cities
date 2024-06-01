import { LatitudeLongitude, MapSize } from "../store";
import { City } from "./city";

export interface Coordinates {
  x: number
  y: number
}

interface Line {
  width: number
  height: string
  left: string
  top: string
  transform: string
}

export const getRealCoordinates = (mapSize: MapSize, currentCity: City): Coordinates => ({
  x: longitudeToX(mapSize.width, currentCity.longitude),
  y: latitudeToY(mapSize.height, currentCity.latitude),
});

export const yToLatitude = (height: number, y: number): number => {
  const mapEquator = height * (9 / 15);
  return ((mapEquator - y) * 90) / mapEquator;
};

export const xToLongitude = (width: number, x: number): number => {
  const mapGreenwich = width / 2;
  return ((x - mapGreenwich) * 180) / mapGreenwich;
};

export const latitudeToY = (height: number, latitude: number): number => {
  const mapEquator = height * (9 / 15);
  return mapEquator - (latitude * mapEquator) / 90
};

export const longitudeToX = (width: number, longitude: number): number => {
  const mapGreenwich = width / 2;
  return (longitude * mapGreenwich) / 180 + mapGreenwich
};

export const getDistanceBetweenTwoCoordinates = (
  { latitude: lat1, longitude: lon1 }: LatitudeLongitude,
  { latitude: lat2, longitude: lon2 }: LatitudeLongitude
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

export const getLineBetweenTwoPoints = ({ x: x1, y: y1 }: Coordinates, { x: x2, y: y2 }: Coordinates): Line => {
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

const getDistanceBetweenTwoPoints = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const getAngleBetweenTwoPoints = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI);

const getCentreBetweenTwoPoints = (x1: number, y1: number, x2: number, y2: number, length: number, thickness: number) => ({
  x: (x1 + x2) / 2 - length / 2,
  y: (y1 + y2) / 2 - thickness / 2,
});
