const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});


// GRID DATA
const grid = [];
const GRID_SIZE = 20;

for (let row = 0; row < GRID_SIZE; row++) {

    for (let col = 0; col < GRID_SIZE; col++) {

        grid.push({
            row,
            col,
            owner: null,
            color: "#1e1e1e",
        });

    }

}
const colors = [
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#a855f7",
    "#f97316",
    "#14b8a6",
];

let onlineUsers = 0;

io.on("connection", function (socket) {
onlineUsers++;
io.emit("online-users", onlineUsers);


const randomColor =
colors[Math.floor(Math.random() * colors.length)];

socket.userColor = randomColor;

    console.log("user connected:", socket.id);

    socket.emit("initial-grid", grid);

    socket.on("claim-cell", function(data){

    const cell = grid.find(function(item){

        return item.row === data.row &&
               item.col === data.col;

    });

    if(cell && cell.owner === null){

        cell.owner = socket.id;

        cell.color = socket.userColor;

        io.emit("cell-updated", cell);

    }

});

    socket.on("disconnect", function () {
    onlineUsers--;
    io.emit("online-users", onlineUsers);

    console.log("user disconnected");
    
    });

});


server.listen(5000, function () {
    console.log("server running on port 5000");
});