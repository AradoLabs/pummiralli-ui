import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import { MapDetails } from '../domain/game'
import KPoint from './KPoint'
import Checkpoint from './Checkpoint'
import Goal from './Goal'

type Props = {
  map: MapDetails
  children: any
}

export default function Map(props: Props) {
  const { width, height, kPoint, goal, checkpoints } = props.map

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect width={width} height={height} fill="green"></Rect>
        <KPoint position={kPoint} />
        {checkpoints.map(checkpoint => (
          <Checkpoint
            key={`checkpoint-${checkpoint.x}-${checkpoint.y}`}
            position={checkpoint}
          />
        ))}
        <Goal position={goal} />
        {props.children}
      </Layer>
    </Stage>
  )
}
