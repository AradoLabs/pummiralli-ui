import React from 'react'
import { Circle, Group, Text } from 'react-konva'
import { Player } from '../domain/game'

type Props = {
  player: Player
}

const Character = React.memo((props: Props) => {
  const { position, name } = props.player
  const { x, y } = position
  const namePositionX = x - name.length * 2
  const namePositionY = y + 20

  return (
    <Group>
      <Circle x={x} y={y} radius={9} fill="white" />
      <Text x={namePositionX} y={namePositionY} text={name} fill="#fff" />
    </Group>
  )
})

export default Character
