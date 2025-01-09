const data = require('./data')

const routes = [
  {
    path: '/users',
    method: 'GET',
    handler: (req, res) => {
      return returnJson(res, data.users)
    },
  },
  {
    path: '/users/(\\d+)',
    method: 'GET',
    handler: (req, res) => {
      const id = req.url.split('/')[2]
      const user = data.users.find((user) => user.id === Number(id))

      if (!user) {
        return notFound(res)
      }

      return returnJson(res, user)
    },
  },
]

function returnJson(res, data) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ data }))
  res.end()
}

function notFound(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.write(JSON.stringify({ message: 'Not Found' }))
  res.end()
}

function handler(req, res) {
  const url = req.url
  const method = req.method
  const route = routes.find(
    (route) =>
      new RegExp(`^${route.path}$`).test(url) && route.method === method
  )

  if (!route) {
    return notFound(res)
  }

  return route.handler(req, res)
}

exports.handler = handler
