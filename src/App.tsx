import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Group, Text } from 'react-konva'
import { RootState } from './domain'
import { GameState, Player } from './domain/game'
import Loop from './ui/game-kit-components/Loop'
import Map from './ui/Map'
import Character from './ui/Character'
import Route from './ui/Route'
import useAnimationFrame from './ui/hooks/useAnimationFrame'
import GameLoader from './loader/gameLoader'

const gameLoader = new GameLoader()
console.log('> loading game events')
gameLoader.loadGameEvents()

export default function App() {
  const gameState = useSelector<RootState, GameState>(state => state.game)
  const [tick, setTick] = useState(1)
  const dispatch = useDispatch()

  useAnimationFrame(15, () => {
    if (gameLoader.finalTick && tick >= gameLoader.finalTick) {
      return
    }
    setTick(prevTick => prevTick + 1)
  })

  useEffect(() => {
    const gameEventsForTick = gameLoader.parseGameEvents(tick)
    if (gameEventsForTick) {
      gameEventsForTick.forEach(dispatch)
    }
  }, [dispatch, tick])

  const players = Object.values(gameState.players)
  return (
    <Loop>
      <Map map={gameState.map}>
        {players.map((player: Player) => {
          return (
            <Group key={player.id}>
              <Route player={player} route={player.route} />
              <Character player={player} />
            </Group>
          )
        })}
        <Text
          x={gameState.map.width - 60}
          y={gameState.map.height - 30}
          fontSize={14}
          fill="white"
          text={`tick ${gameState.tick}`}
        />
      </Map>
    </Loop>
  )
}
