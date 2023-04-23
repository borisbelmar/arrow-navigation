type Callback<TArgs extends unknown[] = unknown[]> = (...args: TArgs) => void
type EventMap = Record<string, Callback[]>
export type EventEmitter = {
  on: <T extends Callback> (eventName: string, callback: T) => void
  off: <T extends Callback> (eventName: string, callback?: T) => void
  emit: (eventName: string, ...args: unknown[]) => void
}

function createEventEmitter (): EventEmitter {
  const events: EventMap = {}

  function on<T extends Callback> (eventName: string, callback: T): void {
    if (!events[eventName]) {
      events[eventName] = []
    }
    events[eventName].push(callback)
  }

  function off<T extends Callback> (eventName: string, callback?: T): void {
    if (events[eventName]) {
      if (!callback) {
        events[eventName] = []
        return
      }
      events[eventName] = events[eventName].filter(cb => cb !== callback)
    }
  }

  function emit (eventName: string, ...args: unknown[]): void {
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
