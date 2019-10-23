import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Group, Text } from 'react-konva'
import { RootState } from './domain'
import { GameState, Player } from './domain/game'
import Loop from './ui/game-kit-components/Loop'
import Map from './ui/Map'
import Character from './ui/Character'
import Route from './ui/Route'
import useInterval from './ui/hooks/useInterval'
import GameLoader from './loader/gameLoader'

const gameLoader = new GameLoader()
console.log('> loading game events')
gameLoader.loadGameEvents()

export default function App() {
  const gameState = useSelector<RootState, GameState>(state => state.game)
  const [tick, setTick] = useState(1)
  const dispatch = useDispatch()

  const gameEventsForTick = gameLoader.parseGameEvents(tick)
  let allGameEventsProcessed = false
  if (gameEventsForTick === undefined) {
    allGameEventsProcessed = true
  }

  useInterval(
    () => {
      if (gameEventsForTick) {
        gameEventsForTick.forEach(dispatch)
      }
      setTick(tick + 1)
    },
    allGameEventsProcessed ? null : 50,
  )

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
