const log = require('debug')('center')
const emphasize = require('emphasize')


function highlight(filename, source) {
  log('highlight', { filename, source })
  return emphasize.highlightAuto(source).value
}

module.exports = {
  highlight,
}
