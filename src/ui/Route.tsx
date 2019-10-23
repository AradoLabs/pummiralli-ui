import React from 'react'
import { Player, Position } from '../domain/game'
import { Line } from 'react-konva'

type Props = {
  player: Player
  route: Position[]
}

export default function Route(props: Props) {
  if (props.route.length === 0) {
    return null
  }
  const points = props.route.map(position => [position.x, position.y]).flat()
  return <Line points={points} stroke="white" />
}
