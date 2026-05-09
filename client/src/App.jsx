import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");




function App() {
  const [onlineUsers, setOnlineUsers] = useState(0);

  const [grid, setGrid] = useState([]);

 useEffect(() => {

  socket.on("connect", () => {
    console.log("Connected:", socket.id);
  });

  socket.on("online-users", function(count){
    setOnlineUsers(count);
  });

  socket.on("initial-grid", (data) => {
    setGrid(data);
  });

  socket.on("cell-updated", function(updatedCell){

    setGrid(function(prevGrid){

      return prevGrid.map(function(cell){

        if(
          cell.row === updatedCell.row &&
          cell.col === updatedCell.col
        ){
          return updatedCell;
        }

        return cell;

      });

    });

  });

}, []);

 return (
  <div className="app">

    <h1 className="title">
      Realtime Grid Battle
    </h1>

    <p className="subtitle">
      Click cells to capture territory
    </p>
    <p className="online-users">
  Online Users: {onlineUsers}
</p>

    <div className="grid-container">

      {grid.map((cell, index) => (

        <div
          key={index}
          className="cell"

          style={{
            backgroundColor: cell.color,
          }}

          onClick={() => {

            socket.emit("claim-cell", {
              row: cell.row,
              col: cell.col,
            });

          }}

        ></div>

      ))}

    </div>

  </div>
);
}

export default App;