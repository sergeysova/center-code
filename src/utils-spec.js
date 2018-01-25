'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const { join } = require('path')


/* global describe, it, xit */
// eslint-disable-next-line no-unused-vars
const index = join(__dirname, '..', 'index.js')
const utils = require('./utils')


describe('startsWithShebang', () => {
  const isShebang = utils.startsWithShebang

  it('is a function', () => {
    la(is.fn(isShebang))
  })

  it('detects the shebang line', () => {
    la(isShebang('#!/usr/bin/env node\n\nvar foo = 42;'))
  })

  it('ignores if no shebang', () => {
    la(!isShebang('var foo = 42;'))
  })

  it('ignores if has spaces', () => {
    la(!isShebang('  #!/usr/bin/env node\n\nvar foo = 42;'))
  })

  it('ignores if has empty lines', () => {
    la(!isShebang('\n#!/usr/bin/env node\n\nvar foo = 42;'))
  })
})

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

  xit('keeps the shebang', () => {
    // depends on
    // https://github.com/thlorenz/cardinal/issues/10
    const text = highlight('foo.js', '#!/usr/bin/env node\n\nvar foo = 42;')

    la(text.indexOf('env node') !== -1, 'keeps the shebang', text)
  })

  it('cannot handle spaces in front of shebang', () => {
    la(is.raises(() => {
      highlight('foo.js', '  #!/usr/bin/env node\n\nvar foo = 42;')
    }))
  })

  it('cannot handle lines in front of shebang', () => {
    la(is.raises(() => {
      highlight('foo.js', '\n#!/usr/bin/env node\n\nvar foo = 42;')
    }))
  })
})
