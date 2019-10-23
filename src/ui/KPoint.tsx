import React from 'react'
import { Position } from '../domain/game'
import { RegularPolygon } from 'react-konva'

type Props = {
  position: Position | null
}

const KPoint = React.memo(({ position }: Props) => {
  if (!position) {
    return null
  }
  const { x, y } = position

  return (
    <RegularPolygon
      x={x}
      y={y}
      sides={3}
      lineJoin="bevel"
      radius={10}
      fillEnabled={false}
      stroke="white"
      strokeWidth={2}
    />
  )
})

export default KPoint
