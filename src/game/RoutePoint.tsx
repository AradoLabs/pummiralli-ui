import React from 'react'

export interface Point {
  x: number
  y: number
}

type Props = {
  point: Point
}

export default class RoutePoint extends React.PureComponent<Props> {
  render() {
    const { point: position } = this.props
    return (
      <div
        style={{
          position: 'absolute',
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: 1,
          height: 1,
          backgroundColor: '#fff',
        }}
      />
    )
  }
}
