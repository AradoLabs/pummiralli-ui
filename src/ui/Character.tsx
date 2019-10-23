import React from 'react'
import { Circle } from 'react-konva'
import { Player } from '../domain/game'

type Props = {
  player: Player
}

const Character = React.memo((props: Props) => {
  const { position } = props.player
  const { x, y } = position

  return <Circle x={x} y={y} radius={9} fill="white" />
})

export default Character
