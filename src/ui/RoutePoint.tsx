import React from 'react'
import { Position } from '../domain/game'

type Props = {
  position: Position
}

const RoutePoint = React.memo(({ position }: Props) => (
  <div
    style={{
      position: 'absolute',
      transform: `translate(${position.x}px, ${position.y}px)`,
      width: 1,
      height: 1,
      backgroundColor: '#fff',
    }}
  />
))

export default RoutePoint
