const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnected')
    })
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})
