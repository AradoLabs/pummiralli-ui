import R from 'ramda'
import { Action } from 'redux'
import { HistoryEvent } from './messages'
import { gameActions } from '../domain/game'
import gameJson from './2019-10-20T15:42:30.992Z.json'

export default class GameLoader {
  events: HistoryEvent[] = []
  finalTick: number | null = null

  loadGameEvents(): void {
    this.events = gameJson as HistoryEvent[]
    this.finalTick = Math.max(...this.events.map(event => event.tick))
  }

  parseGameEvents(tick: number): Action[] | undefined {
    const eventsForTick = this.events.filter(event => event.tick === tick)
    if (eventsForTick.length === 0) {
      return undefined
    }
    const actions = eventsForTick
      .map(eventForTick => {
        switch (eventForTick.message.messageType) {
          case 'map': {
            console.log('map ' + tick, eventForTick.message.data)
            return gameActions.applyMap.done({
              result: {
                tick,
                map: eventForTick.message.data,
              },
            })
          }
          case 'playerPositions': {
            return gameActions.applyPlayerPositions.done({
              result: {
                tick,
                players: eventForTick.message.data,
              },
            })
          }
          default:
            return null
        }
      })
      .filter(event => event !== null) as Action[]
    return actions
  }
}
