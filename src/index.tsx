import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { configureStore } from './store'
import './index.css'
import App from './App'

const root = document.getElementById('root') as HTMLDivElement
const store = configureStore()
ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  root,
)
