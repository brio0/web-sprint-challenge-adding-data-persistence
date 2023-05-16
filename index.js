// start your server here
const server = require('./api/server')

server.listen(9000, () => {
    console.log('server has started on http://localhost:9000')
})

