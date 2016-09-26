var request = require('request')

const makeRequest = (path, delay) => {
  if (!path) {
    path = ''
  }

  if (!delay) {
    delay = 0
  }
  return new Promise(resolve => {
    setTimeout(() => {
      request(`http://ask.fm/${path}`, (a, b, c, d, e) => {
        var body = b.body
        resolve(body)
      })
    }, delay)
  })
}

exports.makeRequest = makeRequest