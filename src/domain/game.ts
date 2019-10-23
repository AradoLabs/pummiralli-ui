import actionCreatorFactory from 'typescript-fsa'
import { immerReducer } from '../utils/reduxHelpers'

export interface Position {
  x: number
  y: number
}

export interface Player {
  id: string
  name: string
  route: Position[]
  position: Position
}

export interface MapDetails {
  width: number
  height: number
  kPoint: Position | null
  checkpoints: Position[]
  goal: Position | null
}

export interface GameState {
  tick: number
  map: MapDetails
  players: {
    [playerId: string]: Player
  }
}

const actionCreator = actionCreatorFactory('game')
type PlayerFromJson = Omit<Player, 'route'>

export const gameActions = {
  applyMap: actionCreator.async<
    void,
    // route is not coming from json
    { tick: number; map: MapDetails },
    void
  >('APPLY_MAP'),
  applyPlayerPositions: actionCreator.async<
    void,
    // route is not coming from json
    { tick: number; players: PlayerFromJson[] },
    void
  >('APPLY_PLAYER_POSITIONS'),
}

export default immerReducer<GameState>({
  tick: 0,
  map: {
    width: 1024,
    height: 576,
    kPoint: null,
    checkpoints: [],
    goal: null,
  },
  players: {},
})
  .case(gameActions.applyMap.done, (state, payload) => {
    const { tick, map } = payload.result
    state.tick = tick
    state.map.kPoint = map.kPoint
    state.map.checkpoints = map.checkpoints
    state.map.goal = map.goal
  })

  .case(gameActions.applyPlayerPositions.done, (state, payload) => {
    state.tick = payload.result.tick
    payload.result.players.forEach((playerFromJson: PlayerFromJson) => {
      const playerInState = state.players[playerFromJson.id]
      if (!playerInState) {
        state.players[playerFromJson.id] = { ...playerFromJson, route: [] }
      } else {
        playerInState.position = playerFromJson.position
        playerInState.route.push(playerFromJson.position)
      }
    })
  })

  .build()
