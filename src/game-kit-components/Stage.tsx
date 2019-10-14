import React from 'react'
import LoopContext from '../utils/LoopContext'

type Props = {
  children: any
  width: number
  height: number
  style: React.CSSProperties | null
}

type State = {
  dimensions: [number, number]
}

export default class Stage extends React.Component<Props, State> {
  static contextType = LoopContext
  context!: React.ContextType<typeof LoopContext>
  container: HTMLDivElement | null

  static defaultProps = {
    width: 1024,
    height: 576,
  }

  setDimensions = () => {
    if (!this.container) {
      return null
    }
    this.setState({
      dimensions: [this.container.offsetWidth, this.container.offsetHeight],
    })
  }

  constructor(props: Props) {
    super(props)

    this.container = null
    this.state = {
      dimensions: [0, 0],
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.setDimensions)
    this.setDimensions()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDimensions)
  }

  getScale() {
    const [vwidth, vheight] = this.state.dimensions
    const { height, width } = this.props

    let targetWidth
    let targetHeight
    let targetScale

    if (height / width > vheight / vwidth) {
      targetHeight = vheight
      targetWidth = (targetHeight * width) / height
      targetScale = vheight / height
    } else {
      targetWidth = vwidth
      targetHeight = (targetWidth * height) / width
      targetScale = vwidth / width
    }

    if (!this.container) {
      return {
        height,
        width,
        scale: 1,
      }
    } else {
      return {
        height: targetHeight,
        width: targetWidth,
        scale: targetScale,
      }
    }
  }

  getWrapperStyles(): React.CSSProperties {
    return {
      height: '100%',
      width: '100%',
      position: 'relative',
    }
  }

  getInnerStyles(): React.CSSProperties {
    const scale = this.getScale()
    const xOffset = Math.floor((this.state.dimensions[0] - scale.width) / 2)
    const yOffset = Math.floor((this.state.dimensions[1] - scale.height) / 2)

    return {
      height: Math.floor(scale.height),
      width: Math.floor(scale.width),
      position: 'absolute',
      overflow: 'hidden',
      transform: `translate(${xOffset}px, ${yOffset}px)`,
    }
  }

  render() {
    return (
      <div
        style={this.getWrapperStyles()}
        ref={c => {
          this.container = c
        }}
      >
        <div style={{ ...this.getInnerStyles(), ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
