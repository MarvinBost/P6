// All dependencies

const http = require('http') //import lib http
const app = require('./app') //import app.js

//normalize the port to test if it is not a number

const normalizePort = val => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const port = normalizePort(process.env.PORT || 3000)

app.set('port', port)

//errorHandler() it's a little bit obvious, but it's an error handler

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const adress = server.address()
    const bind = typeof adress === 'string' ? 'pipe' + adress : 'port: ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges') // error : adress requires elevated privileges.
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.') // error : adress is already in use.
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
    const adress = server.address()
    const bind = typeof adress === 'string' ? 'pipe' + adress : 'port ' + port
    console.log('Listening on ' + bind)
})

server.listen(port)