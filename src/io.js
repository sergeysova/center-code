// taken from
// https://github.com/MostlyAdequate/mostly-adequate-guide
const R = require('ramda')


console.assert(typeof R.compose === 'function', 'has R.compose')

const IO = function IO(f) {
  this.unsafePerformIO = f
}

IO.of = function of(x) {
  return new IO((() => x))
}

IO.prototype.map = function map(f) {
  return new IO(R.compose(f, this.unsafePerformIO))
}

module.exports = IO
