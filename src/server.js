const express = require('express')
const path = require('path')

const app = express()

const server = require('http').createServer(app)

const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res)=> {
    res.render('index.html')
})

let messages =[]
io.on('connection', socket => {
    console.log('Sockect conectado', socket.id)

    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data => {
       messages.push(data)
       socket.broadcast.emit('receivedMessage', data)
       //socket.emit enviar message unicamente para esse socket
       //socket.on ouvir uma mensagem
       //socket.broadcast.emit envia para todos os sockets conectados
    })
})



server.listen(3333)