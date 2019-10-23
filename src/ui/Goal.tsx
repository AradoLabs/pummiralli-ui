import React from 'react'
import { Position } from '../domain/game'
import { Group, Circle } from 'react-konva'

type Props = {
  position: Position | null
}

const Goal = React.memo(({ position }: Props) => {
  if (!position) {
    return null
  }
  const { x, y } = position

  return (
    <Group>
      <Circle
        x={x}
        y={y}
        radius={10}
        fillEnabled={false}
        stroke="white"
        strokeWidth={1.5}
      />
      <Circle
        x={x}
        y={y}
        radius={7}
        fillEnabled={false}
        stroke="white"
        strokeWidth={1.5}
      />
    </Group>
  )
})

export default Goal
