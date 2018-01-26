'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const { join } = require('path')


/* global describe, it */
// eslint-disable-next-line no-unused-vars
const index = join(__dirname, '..', 'index.js')
const utils = require('./utils')


describe('highlight(filename, text)', () => {
  const { highlight } = utils

  it('is a function', () => {
    la(is.fn(highlight))
  })

  it('highlights a piece of code', () => {
    const source = 'var foo = 42;'
    const text = highlight('foo.js', source)

    la(is.unemptyString(text), text)
  })

  it('highlights a piece of code with shebang', () => {
    const text = highlight('foo.js', '#!/usr/bin/env node\n\nvar foo = 42;')

    la(is.unemptyString(text), text)
  })

  it('keeps the shebang', () => {
    const text = highlight('foo.js', '#!/usr/bin/env node\n\nvar foo = 42;')

    la(text.indexOf('env node') !== -1, 'keeps the shebang', text)
  })
})
