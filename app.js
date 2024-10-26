const express = require("express");
const app = express();
const path = require("path")

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);

const io = socketIo(server);

app.set("view engine","ejs");
app.use(express.static (path.join(__dirname, "public")));

io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recive-location",{id:socket.id, ...data})
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
    })
    console.log("connected")
})

app.get("/",(req,res)=>{
    res.render("index")
})


server.listen(process.env.PORT || 3000)
