import React from 'react'
import GameLoop from './GameLoop'

const LoopContext = React.createContext<GameLoop>(new GameLoop())
export default LoopContext
