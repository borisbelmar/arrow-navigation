type Callback<T extends unknown[]> = (...args: T) => void

type EventMap = Record<string, Callback<unknown[]>[]>

export type EventEmitter = {
  on: <T extends unknown[]> (eventName: string, callback: Callback<T>) => void
  off: <T extends unknown[]> (eventName: string, callback?: Callback<T>) => void
  emit: <T extends unknown[]> (eventName: string, ...args: T) => void
}

function createEventEmitter (): EventEmitter {
  const events: EventMap = {}

  function on<T extends unknown[]> (eventName: string, callback: Callback<T>): void {
    if (!events[eventName]) {
      events[eventName] = []
    }
    events[eventName].push(callback as Callback<unknown[]>)
  }

  function off<T extends unknown[]> (eventName: string, callback?: Callback<T>): void {
    if (events[eventName]) {
      if (!callback) {
        events[eventName] = []
        return
      }
      events[eventName] = events[eventName].filter(cb => cb !== callback)
    }
  }

  function emit <T extends unknown[]> (eventName: string, ...args: T): void {
    if (events[eventName]) {
      events[eventName].forEach(callback => callback(...args))
    }
  }

  return {
    on,
    off,
    emit
  }
}

export default createEventEmitter
