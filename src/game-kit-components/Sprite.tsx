import React from 'react'
import LoopContext from '../utils/LoopContext'

type Props = {
  offset: [number, number]
  onPlayStateChanged: (state: number) => void
  repeat: boolean
  scale: number
  src: string
  state: number
  steps: number[]
  style?: React.CSSProperties | null
  ticksPerFrame: number
  tileHeight: number
  tileWidth: number
}

type State = {
  currentStep: any
}

export default class Sprite extends React.Component<Props, State> {
  static contextType = LoopContext
  context!: React.ContextType<typeof LoopContext>

  static defaultProps = {
    offset: [0, 0],
    onPlayStateChanged: () => {},
    repeat: true,
    src: '',
    state: 0,
    steps: [],
    ticksPerFrame: 4,
    tileHeight: 64,
    tileWidth: 64,
  }

  loopId: any
  tickCount: number
  finished: boolean

  constructor(props: Props) {
    super(props)

    this.loopId = null
    this.tickCount = 0
    this.finished = false

    this.state = {
      currentStep: 0,
    }
  }

  componentDidMount() {
    this.props.onPlayStateChanged(1)
    const animate = this.animate.bind(this, this.props)
    this.loopId = this.context.subscribe(animate)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.state !== this.props.state) {
      this.finished = false
      this.props.onPlayStateChanged(1)
      this.context.unsubscribe(this.loopId)
      this.tickCount = 0

      this.setState(
        {
          currentStep: 0,
        },
        () => {
          const animate = this.animate.bind(this, nextProps)
          this.loopId = this.context.subscribe(animate)
        },
      )
    }
  }

  componentWillUnmount() {
    this.context.unsubscribe(this.loopId)
  }

  animate(props: Props) {
    const { repeat, ticksPerFrame, state, steps } = props

    if (this.tickCount === ticksPerFrame && !this.finished) {
      if (steps[state] !== 0) {
        const { currentStep } = this.state
        const lastStep = steps[state]
        const nextStep = currentStep === lastStep ? 0 : currentStep + 1

        this.setState({
          currentStep: nextStep,
        })

        if (currentStep === lastStep && repeat === false) {
          this.finished = true
          this.props.onPlayStateChanged(0)
        }
      }

      this.tickCount = 0
    } else {
      this.tickCount++
    }
  }

  getImageStyles(): React.CSSProperties {
    const { currentStep } = this.state
    const { state, tileWidth, tileHeight } = this.props

    const left = this.props.offset[0] + currentStep * tileWidth
    const top = this.props.offset[1] + state * tileHeight

    return {
      position: 'absolute',
      transform: `translate(-${left}px, -${top}px)`,
    }
  }

  getWrapperStyles(): React.CSSProperties {
    return {
      height: this.props.tileHeight,
      width: this.props.tileWidth,
      overflow: 'hidden',
      position: 'relative',
      transform: `scale(${this.props.scale})`,
      transformOrigin: 'top left',
      imageRendering: 'pixelated',
    }
  }

  render() {
    return (
      <div style={{ ...this.getWrapperStyles(), ...this.props.style }}>
        <img style={this.getImageStyles()} src={this.props.src} />
      </div>
    )
  }
}
