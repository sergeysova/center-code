'use strict'

const log = require('debug')('center')
const check = require('check-more-types')
const la = require('lazy-ass')
const cardinal = require('cardinal')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')


function highlightMarkdown(text) {
  marked.setOptions({
    renderer: new TerminalRenderer(),
  })
  return marked(text)
}

function isJavaScript(filename) {
  return /\.js$/.test(filename)
}

function isJson(filename) {
  return /\.json$/.test(filename)
}

function isMarkdown(filename) {
  return /\.md$/.test(filename)
    || /\.markdown$/.test(filename)
}

function startsWithShebang(text) {
  return /^#!/.test(text) // eslint-disable-line unicorn/prefer-starts-ends-with
}

function highlight(filename, text) {
  la(check.unemptyString(text), 'missing text to highlight')

  let highlighted = text

  if (startsWithShebang(text)) {
    log('%s starts with shebang, cannot highlight', filename)
    return highlighted
  }

  if (isJavaScript(filename)) {
    log('highlighting javascript file', filename)
    highlighted = cardinal.highlight(text)
  }
  else if (isJson(filename)) {
    log('highlighting json file', filename)
    highlighted = cardinal.highlight(text, { json: true })
  }
  else if (isMarkdown(filename)) {
    log('highlighting Markdown file', filename)
    highlighted = highlightMarkdown(text)
  }
  return highlighted
}

module.exports = {
  startsWithShebang,
  highlight,
}
