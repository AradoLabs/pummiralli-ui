import React, { useEffect, useContext } from 'react'
import LoopContext from '../utils/LoopContext'
import GameLoop from '../utils/GameLoop'

function LoopConsumer({ children }: { children: any }) {
  const loopContext = useContext(LoopContext)
  useEffect(() => {
    loopContext.start()
    return () => loopContext.stop()
  })
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

export default function Loop({ children }: { children: any }) {
  const gameLoop = new GameLoop()
  return (
    <LoopContext.Provider value={gameLoop}>
      <LoopConsumer>{children}</LoopConsumer>
    </LoopContext.Provider>
  )
}
