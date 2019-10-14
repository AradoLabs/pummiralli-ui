import React from 'react'
import RoutePoint, { Point } from './RoutePoint'

type State = {
  routePoints: Point[]
}

export default class Route extends React.Component<any, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      routePoints: [],
    }
  }

  // componentDidMount() {
  //   this.characterWatcher = autorun(() => {
  //     const { x, y } = GameStore.characterPosition;
  //     const positionExists = this.state.routePositions.find(p => {
  //       return p.x === x && p.y === y;
  //     });
  //     if (positionExists) {
  //       return;
  //     }
  //     this.setState({
  //       routePositions: [...this.state.routePositions, { x, y }],
  //     });
  //   });
  // }

  getWrapperStyles(): React.CSSProperties {
    return {
      position: 'absolute',
      transform: `translate(0px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
    }
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        {this.state.routePoints.map(point => (
          <RoutePoint point={point} />
        ))}
      </div>
    )
  }
}
