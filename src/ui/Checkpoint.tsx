import React from 'react'
import { Position } from '../domain/game'
import { Circle } from 'react-konva'

type Props = {
  position: Position | null
}

const Checkpoint = React.memo(({ position }: Props) => {
  if (!position) {
    return null
  }
  const { x, y } = position

  return (
    <Circle
      key={`checkpoint-${x}-${y}`}
      x={x}
      y={y}
      radius={10}
      fillEnabled={false}
      stroke="white"
      strokeWidth={1.5}
    />
  )
})

export default Checkpoint
