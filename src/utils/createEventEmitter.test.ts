import createEventEmitter from './createEventEmitter'

describe('createEventEmitter', () => {
  it('should return an object with on, off and emit methods', () => {
    const emitter = createEventEmitter()
    expect(emitter).toEqual({
      on: expect.any(Function),
      off: expect.any(Function),
      emit: expect.any(Function)
    })
  })

  it('should call the callback when the event is emitted', () => {
    const emitter = createEventEmitter()
    const callback = jest.fn()
    emitter.on('event', callback)
    emitter.emit('event')
    expect(callback).toHaveBeenCalled()
  })

  it('should call the callback with the arguments when the event is emitted', () => {
    const emitter = createEventEmitter()
    const callback = jest.fn()
    emitter.on('event', callback)
    emitter.emit('event', 'foo', 'bar')
    expect(callback).toHaveBeenCalledWith('foo', 'bar')
  })

  it('should register and unregister one event', () => {
    const emitter = createEventEmitter()
    const callback = jest.fn()
    emitter.on('event', callback)
    emitter.emit('event')
    emitter.off('event', callback)
    emitter.emit('event')
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should remove all events when no callback is passed', () => {
    const emitter = createEventEmitter()
    const callback = jest.fn()
    const callback2 = jest.fn()
    emitter.on('event', callback)
    emitter.on('event', callback2)
    emitter.emit('event')
    emitter.off('event')
    emitter.emit('event')
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })
})
