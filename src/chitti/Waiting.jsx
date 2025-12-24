import React, { useEffect, useState, useRef } from "react";
import Screenshot_2025 from "../assets/Screenshot_2025.png";
import "./Waiting.css";
import { useLocation, useNavigate} from "react-router-dom";
import io from "socket.io-client";
import { Navigate } from "react-router-dom";

const Waiting = () => {
  const { state } = useLocation();
  const [players, setPlayers] = useState([]);
  const roomcode = state?.roomcode;
  const player = state?.player;
  const ishost =state?.ishost;
  const socketRef = useRef(null);
  console.log("state",state)
  const navigate = useNavigate();

  useEffect(() => {
    // Create socket only once
    socketRef.current = io("https://ayhuna-backend.onrender.com");

    // Emit join-room only after connection
    socketRef.current.on("connect", () => {
      if (!state?.isHost) {
        console.log("Connected:", socketRef.current.id);
        socketRef.current.emit("join-room", { player, roomcode });
      }
    });

    socketRef.current.on("room-update", (room) => {
      console.log("ROOM UPDATE:", room);
      setPlayers(room.players);
    });

    return () => {
      socketRef.current.off("room-update");
      socketRef.current.disconnect();
    };
  }, []);
  console.log(players);

  if(players.length === 4){
    navigate('/Creation',{
      state:{
        player:player,
        ishost:ishost,
        roomcode:roomcode
      }
    })
  }

  return (
    <div className="waiting-wrapper">
      <div className="logo">
        <img src={Screenshot_2025} alt="logo" />
        <h1>SHoOo..!</h1>
      </div>

      <div className="waiting-container">
        <h2>Waiting Room</h2>
        <h3>Room Code: {roomcode}</h3>

        <p>Waiting for other players to join...</p>

        <ul>
          {players.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
      <footer className='waitingfooter'>
          © {new Date().getFullYear()} varun. All rights reserved.
    </footer>
    </div>
  );
};

export default Waiting;
