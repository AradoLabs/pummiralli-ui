import { combineReducers } from 'redux'
import { RootStateForReducers } from '../utils/reduxHelpers'

import gameReducer from './game'

const reducers = () =>
  combineReducers({
    game: gameReducer,
  })

export type RootState = RootStateForReducers<typeof reducers>

export default reducers
