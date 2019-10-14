import React from 'react'
import Sprite from '../game-kit-components/Sprite'
import LoopContext from '../utils/LoopContext'
import KeyListener from '../utils/KeyListener'
import characterSprite from '../assets/character-sprite.png'

type Props = {
  keyListener: KeyListener
}

type State = {
  positionX: number
  positionY: number
  characterState: number
  loop: boolean
  spritePlaying: boolean
  repeat: boolean
}

export default class Character extends React.Component<Props, State> {
  static contextType = LoopContext
  context!: React.ContextType<typeof LoopContext>
  loopId: number | null

  constructor(props: Props) {
    super(props)

    this.loopId = null

    this.state = {
      positionX: 10,
      positionY: 20,
      characterState: 2,
      loop: false,
      spritePlaying: true,
      repeat: false,
    }
  }

  handlePlayStateChanged = (state: number) => {
    this.setState({
      spritePlaying: state ? true : false,
    })
  }

  move = (deltaX: number, deltaY: number) => {
    const newX = this.state.positionX + deltaX
    const newY = this.state.positionY + deltaY
    this.setState({
      positionX: newX,
      positionY: newY,
    })
  }

  checkKeys = () => {
    const { keyListener: keys } = this.props

    let characterState = 2
    const AmountToMove = 1

    if (keys.isDown(keys.LEFT)) {
      this.move(-AmountToMove, 0)
    } else if (keys.isDown(keys.DOWN)) {
      this.move(0, AmountToMove)
      characterState = 1
    } else if (keys.isDown(keys.RIGHT)) {
      this.move(AmountToMove, 0)
      characterState = 0
    } else if (keys.isDown(keys.UP)) {
      this.move(0, -AmountToMove)
    }

    this.setState({
      characterState,
      repeat: characterState < 2,
    })
  }

  update = () => {
    //const { setCharacterPosition } = this.props

    this.checkKeys()
    // setCharacterPosition({
    //   x: this.state.positionX,
    //   y: this.state.positionY,
    // });
  }

  componentDidMount() {
    this.loopId = this.context.subscribe(this.update)
  }

  componentWillUnmount() {
    if (this.loopId) {
      this.context.unsubscribe(this.loopId)
    }
  }

  getWrapperStyles(): React.CSSProperties {
    // const { characterPosition } = this.props.store
    // const { x, y } = characterPosition
    const x = 100
    const y = 150

    return {
      position: 'absolute',
      transform: `translate(${x}px, ${y}px)`,
    }
  }

  render() {
    // const x = this.props.store.characterPosition.x
    // const y = this.props.store.characterPosition.y
    const x = 10
    const y = 15

    return (
      <div style={this.getWrapperStyles()}>
        <div
          style={{
            position: 'absolute',
            transform: `translate(${x}px, ${y}px)`,
          }}
        />
        <Sprite
          repeat={this.state.repeat}
          onPlayStateChanged={this.handlePlayStateChanged}
          src={characterSprite}
          scale={2}
          state={this.state.characterState}
          steps={[9, 9, 0, 4, 5]}
        />
      </div>
    )
  }
}
