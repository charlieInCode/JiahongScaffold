'use strict'

module.exports = (req, res, next) => {
  const _send = res.send
  if (req.method === 'POST'){
      req.method = 'GET'
      req.query = req.body
  }

    res.send = function (body) {
        // if (require('url').parse(req.originalUrl, true).query['singular']) {
          try {
            const json = JSON.parse(body)
            if (Array.isArray(json)) {
              if (json.length === 1) {
                return _send.call(this, JSON.stringify(json[0]))
              } else if (json.length === 0) {
                return _send.call(this, '{}', 404)
              }
            }
          } catch (e) {}
        // }
        return _send.call(this, body)
      }

  next()
}