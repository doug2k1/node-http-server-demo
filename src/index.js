const http = require('http')
const { handler } = require('./routes')

const server = http.createServer(handler)

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
