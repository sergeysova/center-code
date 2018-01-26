# @sergeysova/center-code

> Shows the file's source centered and highlighted in the terminal

```bash
npm install -g @sergeysova/center-code
```

For any file

```bash
center <filename>
# or read from STDIN
cat <filename> | center
```

The file's contents will be centered in the terminal, which is great for demos and live coding.

![@sergeysova/center-code](images/center-code.png)

Any file extension that support [emphasize](https://www.npmjs.com/package/emphasize) is supported in @sergeysova/center-code.
The input read from STDIN is not syntax highlighted.

[![center-code-icon][center-code-icon]][center-code-url]

[![Build status][center-code-ci-image]][center-code-ci-url]
[![dependencies][center-code-dependencies-image] ][center-code-dependencies-url]
[![devdependencies][center-code-devdependencies-image] ][center-code-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

Fork: Sergey Sova &copy; 2018

* [sergeysova.com](https://sergeysova.com)
* [@sergeysovacom](https://twitter.com/sergeysovacom)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/sergeysova/center-code/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Copyright (c) 2018 Sergey Sova

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[center-code-icon]: https://nodei.co/npm/@sergeysova/center-code.png?downloads=true
[center-code-url]: https://npmjs.org/package/@sergeysova/center-code
[center-code-ci-image]: https://travis-ci.org/sergeysova/center-code.svg?branch=master
[center-code-ci-url]: https://travis-ci.org/sergeysova/center-code
[center-code-dependencies-image]: https://david-dm.org/sergeysova/center-code.svg
[center-code-dependencies-url]: https://david-dm.org/sergeysova/center-code
[center-code-devdependencies-image]: https://david-dm.org/sergeysova/center-code/dev-status.svg
[center-code-devdependencies-url]: https://david-dm.org/sergeysova/center-code#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
