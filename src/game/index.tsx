import React, { useEffect } from 'react'
import Loop from '../game-kit-components/Loop'
import Stage from '../game-kit-components/Stage'
import KeyListener from '../utils/KeyListener'
import Character from './Character'
import Route from './Route'

export default function Game() {
  const keyListener = new KeyListener()

  useEffect(() => {
    keyListener.subscribe([
      keyListener.LEFT,
      keyListener.RIGHT,
      keyListener.UP,
      keyListener.DOWN,
      keyListener.SPACE,
      65,
    ])
    return function cleanup() {
      keyListener.unsubscribe()
    }
  })

  return (
    <Loop>
      <Stage style={{ background: '#0c8d20' }}>
        <Route />
        <Character keyListener={keyListener} />
      </Stage>
    </Loop>
  )
}
