const log = require('debug')('center')
const R = require('ramda')
const la = require('lazy-ass')
const check = require('check-more-types')
const Promise = require('bluebird')
const {
  existsSync: exists,
  readFileSync: read,
} = require('fs')

const utils = require('./src/utils')
const IO = require('./src/io')


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

function getSource(filename) {
  return read(filename, 'utf-8')
}

function toPromise(value) {
  return new Promise(((resolve) => {
    resolve(value)
  }))
}

function widest(lines) {
  return lines.reduce((columns, line) => columns > line.length ? columns : line.length, 0)
}

function padVertically(terminal, text) {
  const sourceLines = text.split('\n')

  // Add blank lines before and after source
  sourceLines.unshift('')
  sourceLines.push('')

  return sourceLines.join('\n')
}

function blanks(n) {
  let space = ''

  for (let k = 0; k < n; k += 1) {
    space += ' '
  }
  return space
}

function textSize(text) {
  const lines = text.split('\n')
  const columns = widest(lines)

  return {
    columns,
    rows: lines.length,
  }
}

function padHorizontally(terminal, text, columns) {
  if (check.not.number(columns)) {
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    columns = textSize(text).columns
  }
  la(check.number(columns), 'missing number of columns', text)

  const lines = text.split('\n')
  const blankColumns = Math.floor((terminal.width - columns) / 2)
  const blankPrefix = blanks(blankColumns)

  log('blank prefix "%s" %d columns', blankPrefix, blankPrefix.length)

  const padded = lines.map((line) => blankPrefix + line)

  return padded.join('\n')
}

function centerText(options, source) {
  const monad = terminalSize()
    .map((size) => { // eslint-disable-line array-callback-return
      log('terminal %d x %d', size.width, size.height)

      const sourceSize = textSize(source)

      log('source size %d x %d', sourceSize.columns, sourceSize.rows)

      const highlighted = utils.highlight(options.filename, source)

      const paddedHorizontally = padHorizontally(size, highlighted, sourceSize.columns)
      const paddedVertically = padVertically(size, paddedHorizontally)

      console.log(paddedVertically)
    })

  // nothing has happened yet - no functions executed, just composed
  // now run them (including unsafe ones)
  monad.unsafePerformIO()
}

function grabInput(options) {
  if (options.filename) {
    log('showing in the center %s', options.filename)
    return toPromise(getSource(options.filename))
  }

  log('reading input from STDIN')
  const stdin = require('get-stdin-promise')

  return stdin
}

function centerCode(options) {
  options = options || {}
  options.filename = options.filename || options.name

  if (!exists(options.filename)) {
    console.log('ERROR: cannot find input file', options.filename)
    process.exit(-1)
  }

  grabInput(options)
    .then((source) => {
      centerText(options, source)
    }).catch(console.error.bind(console))
}

module.exports = centerCode

if (!module.parent) {
  console.log('running directly')
  centerCode({
    filename: `${__dirname}/example/small.js`,
  })
}
