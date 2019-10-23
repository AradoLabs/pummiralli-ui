import { createStore, Store } from 'redux'
import createRootReducer, { RootState } from './domain'

export function configureStore(initialState?: RootState) {
  //let middleware = applyMiddleware(sagaMiddleware, reduxSentryMiddleware)

  if (process.env.NODE_ENV === 'development') {
    //const { composeWithDevTools } = require('redux-devtools-extension')
    //middleware = composeWithDevTools()
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    //middleware,
  ) as Store<RootState>

  return store
}
