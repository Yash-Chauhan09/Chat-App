// Node server which handle socket io connection
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.render("index");
})

server.listen(process.env.PORT||3000);

const users = {};
io.on('connection', socket =>{
    socket.on('new-user-joined',name =>{
        // console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send-message',message=>{
        socket.broadcast.emit('recieve-message',{
            message:message,name:users[socket.id]})
        });
        socket.on('disconnect', message => {
           socket.broadcast.emit('left',users[socket.id]);
          delete users[socket.id];
        });
    });
