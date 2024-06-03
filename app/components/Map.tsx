import React, { FC, useCallback, useEffect, useRef } from 'react'
import RoundResult from './RoundResult'
import Splash from './Splash'
import { useStore } from '../store'

const Map: FC = () => {
  const mapSize = useStore(({ mapSize }) => mapSize)
  const splashScreen = useStore(({ splashScreen }) => splashScreen)
  const pause = useStore(({ pause }) => pause)
  const gameOver = useStore(({ gameOver }) => gameOver)
  const showRoundsResult = useStore(({ showRoundsResult }) => showRoundsResult)
  const updateMapSize = useStore(({ updateMapSize }) => updateMapSize)
  const endTurn = useStore(({ endTurn }) => endTurn)
  const mapElement = useRef<HTMLDivElement | null>(null)

  const getMouseCoordinates = ({ clientX, clientY }: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    if (!gameOver && !pause && !splashScreen) {
      endTurn({ x: clientX - mapSize.left, y: clientY - mapSize.top })
    }
  }

  const measureMap = useCallback((): void => {
    if (mapElement.current) {
      const width = mapElement.current.offsetWidth
      const height = mapElement.current.offsetHeight
      const { top, left } = mapElement.current.getBoundingClientRect()

      updateMapSize({ width, height, top: parseInt(top.toFixed()), left: parseInt(left.toFixed()) })
    }
  }, [updateMapSize])

  useEffect(() => {
    measureMap()
    window.addEventListener('resize', measureMap)
    return () => void window.removeEventListener('resize', measureMap)
  }, [measureMap])

  return (
    <div
      ref={mapElement}
      onClick={getMouseCoordinates}
      className="relative z-[1] mx-auto my-0 h-[43.15vw] w-screen cursor-crosshair bg-[url('./assets/map.jpg')] bg-contain bg-center bg-no-repeat"
    >
      {pause && !showRoundsResult && (
        <div className="absolute left-0 top-0 z-[2] flex h-full w-full cursor-default flex-col items-center justify-center bg-neutral-50/5">
          <RoundResult
            city={{
              latitude: pause.city.latitude,
              longitude: pause.city.longitude,
              clicked: pause.clicked,
              name: pause.city.name,
            }}
          />
        </div>
      )}
      {(splashScreen || gameOver) && <Splash />}
    </div>
  )
}

export default Map
