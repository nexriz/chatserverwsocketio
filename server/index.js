import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import chalk from 'chalk'

const app = express()
const server = http.Server(app)
const io = socketio(server)


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
	console.log('a user connected')

	socket.on('disconnect', () => {
		console.log('a user disconnected')
	})
	socket.on('chat message', (msg) => {
		console.log(chalk.green(`message: ${msg}`));
		io.emit('chat message', msg);
	})
	socket.broadcast.emit('hi');
})



server.listen(3000, _ => {
	console.log('server up, listening on port 3000')
})