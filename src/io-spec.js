const la = require('lazy-ass')
const R = require('ramda')
const IO = require('./io')


la(typeof IO === 'function', 'IO should be a function', IO)

/* global describe, it */
describe('IO', () => {
  const ioGlobal = new IO((() => global))

  it('holds an unsafe function', () => {
    la(typeof ioGlobal === 'object', 'created io monad to access global')
  })

  it('can be mapped', () => {
    la(typeof ioGlobal.map === 'function')
  })

  it('wraps global access', (done) => {
    // everything is pure until last line of this test
    function getArguments(glob) {
      return glob.process.argv
    }

    function checkArgs(args) {
      la(Array.isArray(args), 'arguments is a list', args)
    }

    // create a chain of functions
    // BUT nothing is called yet. Including the "dirty"
    // function unsafeGlobalAccess that returns the global state
    const monad = ioGlobal
      .map(getArguments)
      .map(checkArgs)
      .map(done)

    // start the computation. Now unsafeGlobalAccess runs
    monad.unsafePerformIO()
  })
})

describe('terminal size', () => {
  function getProcess() {
    return process
  }

  function terminalSize() {
    return new IO(getProcess)
      .map(R.prop('stdout'))
      .map((outputStream) => ({
        width: outputStream.columns,
        height: outputStream.rows,
      }))
  }

  it('works with a monad', () => {
    let verified // to make sure monad chain ran

    // check the returned size
    const monad = terminalSize()
      .map((size) => { // eslint-disable-line array-callback-return
        la(size.width === 42)
        la(size.height === 20)
        verified = true
      })

    // nothing ran yet. Time to prepare the environment!
    process.stdout.columns = 42
    process.stdout.rows = 20

    // now start the monad execution
    monad.unsafePerformIO()

    la(verified, 'monad executed')
  })
})
