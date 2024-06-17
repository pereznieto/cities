import { FC, useState } from 'react'
import { getCoordinateStyle, getLineBetweenTwoPoints, getRealCoordinates } from '../utils/distance'
import { PlayedCity, useStore } from '../store'
import clsx from 'clsx'

interface Props {
  city: Pick<PlayedCity, 'latitude' | 'longitude' | 'clicked' | 'name'>
}

const RoundResult: FC<Props> = ({ city: { latitude, longitude, clicked, name } }) => {
  const mapSize = useStore(({ mapSize }) => mapSize)
  const realScreenCoordinates = getRealCoordinates(mapSize, { latitude, longitude })
  const clickedScreenCoordinates = clicked ? getRealCoordinates(mapSize, clicked) : null
  const [isCityShown, showCity] = useState<boolean>(true)

  return (
    <div
      className={clsx(
        'cursor-pointer transition-all duration-500 ease-in-out hover:opacity-100',
        isCityShown ? 'opacity-100' : 'opacity-50',
      )}
      onClick={() => showCity((isCurrentlyShown) => !isCurrentlyShown)}
    >
      <div
        className="absolute z-[3] h-2 w-2 animate-pulse-green rounded-full bg-green-500"
        style={getCoordinateStyle(realScreenCoordinates)}
      >
        {isCityShown && (
          <div className="ml-1 mt-1 select-none font-medium text-black drop-shadow-2xl hover:drop-shadow">{name}</div>
        )}
      </div>
      {clickedScreenCoordinates && (
        <>
          <div
            className="absolute z-[3] h-2 w-2 animate-pulse-red rounded-full bg-red-500"
            style={getCoordinateStyle(clickedScreenCoordinates)}
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
