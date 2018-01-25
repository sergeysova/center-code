'use strict'

const la = require('lazy-ass')
const check = require('check-more-types') // eslint-disable-line no-unused-vars
const describeIt = require('describe-it')
const { join } = require('path')


/* global before, it, xit */
const index = join(__dirname, '..', 'index.js')

describeIt(index, 'widest(lines)', (extract) => {
  let widest

  before(() => {
    widest = extract()
  })

  it('finds longest line length', () => {
    const found = widest(['foo', 'bar', '12345'])

    la(found === 5, 'widest line', found)
  })
})

describeIt(index, 'blanks(n)', (extract) => {
  let blanks

  before(() => {
    blanks = extract()
  })

  it('forms empty string with 5 spaces', () => {
    const str = blanks(5)

    la(str === '     ')
  })
})

describeIt(index, 'terminalSize()', (extract) => {
  let terminalSize

  before(() => {
    terminalSize = extract()
  })

  it('works with a monad', () => {
    let verified // to make sure monad chain ran

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

  xit('works under Node', () => {
    const fakeTerminal = {
      columns: 20,
      rows: 10,
    }
    const resolution = terminalSize(fakeTerminal)

    la(resolution, 'got resolution object', resolution)
    la(resolution.width === fakeTerminal.columns, 'has width', resolution)
    la(resolution.height === fakeTerminal.rows, 'has height', resolution)
  })
})
