export default class GameLoop {
  subscribers: any[]
  loopId: number | null

  loop = () => {
    this.subscribers.forEach(callback => {
      callback.call()
    })

    this.loopId = window.requestAnimationFrame(this.loop)
  }

  constructor() {
    this.subscribers = []
    this.loopId = null
  }

  start() {
    if (!this.loopId) {
      this.loop()
    }
  }

  stop() {
    if (this.loopId) {
      window.cancelAnimationFrame(this.loopId)
    }
  }

  subscribe(callback: any): number {
    return this.subscribers.push(callback)
  }

  unsubscribe(id: number) {
    delete this.subscribers[id - 1]
  }
}
