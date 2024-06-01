import { FC } from 'react'
import { Coordinates, getLineBetweenTwoPoints, latitudeToY, longitudeToX } from '../utils/distance'
import { LatitudeLongitude, MapSize, PlayedCity, useStore } from '../store'

const getScreenCoordinates = ({ height, width }: MapSize, { latitude, longitude }: LatitudeLongitude): Coordinates => ({
  x: longitudeToX(width, longitude),
  y: latitudeToY(height, latitude),
})

const getStyle = ({ x, y }: Coordinates) => ({ top: `${y - 4}px`, left: `${x - 4}px` })

interface Props {
  city: Pick<PlayedCity, 'latitude' | 'longitude' | 'clicked'>
}

const RoundResult: FC<Props> = ({ city: { latitude, longitude, clicked } }) => {
  const mapSize = useStore(({ mapSize }) => mapSize)
  const realScreenCoordinates = getScreenCoordinates(mapSize, { latitude, longitude })
  const clickedScreenCoordinates = clicked ? getScreenCoordinates(mapSize, clicked) : null

  return (
    <div className="opacity-65 transition-all duration-500 ease-in-out hover:opacity-100">
      <div
        className="absolute z-[3] h-2 w-2 animate-pulse-green rounded-full bg-green-500"
        style={getStyle(realScreenCoordinates)}
      />
      {clickedScreenCoordinates && (
        <>
          <div
            className="absolute z-[3] h-2 w-2 animate-pulse-red rounded-full bg-red-500"
            style={getStyle(clickedScreenCoordinates)}
          />
          <div
            className="absolute bg-gradient-to-r from-red-500 to-green-500"
            style={getLineBetweenTwoPoints(realScreenCoordinates, clickedScreenCoordinates)}
          />
        </>
      )}
    </div>
  )
}

export default RoundResult
