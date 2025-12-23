import "./Gamezone.css";
import React, { useEffect, useRef, useState } from "react";
import minichild from "../assets/minichild.svg";
import male from "../assets/male.svg";
import girl from "../assets/girl.svg";
import happykid from "../assets/happykid.svg";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import recivedsound from "../assets/sounds/recivedsound.mp3";
import clicksound from "../assets/sounds/clicksound.mp3";
const Gamezone = () => {
  const passAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const [disabled, setdisabled] = useState(false);

  const [hideit, sethideit] = useState(true);
  const socketRef = useRef(null);
  const { state } = useLocation();

  const roomcode = state?.roomcode;
  const player = state?.player;
  const ishost = state?.ishost;
  const [recivedchitti, setrecivedchitti] = useState(false);
  const [Myplayers, setMyplayers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [gameover, setgameover] = useState(false);
  const [winner, setWinner] = useState("");

  // ================= winner condtion check =================
  function checkwinner() {
    console.log("winner check", roomcode, player);

    if (!roomcode || !player) {
      alert("Room or player missing. Please rejoin.");
      return;
    }

    if (!currentPlayerData || currentPlayerData.chitti.length > 4) {
      alert("you have 5 chitti's pass one and try");
      return;
    }
    socketRef.current.emit("winner-check", { roomcode, player });
    setdisabled(true);
    setTimeout(() => setdisabled(false), 3000);
  }

  function hide() {
    sethideit(!hideit);
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play();
  }
  //recived sound
  const playrecivedsound = () => {
    if (passAudioRef.current) {
      passAudioRef.current.currentTime = 0;
      passAudioRef.current.play();
    }
  };

  //click sound
  const playClickSound = () => {
    clickAudioRef.current.currentTime = 0;
    clickAudioRef.current.play();
  };

  // ================= SOCKET =================

  useEffect(() => {
    if (!player || !roomcode) return;

    socketRef.current = io("https://ayhuna-backend.onrender.com");

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-room", { player, roomcode });
    });

    socketRef.current.on("room-update", (room) => {
      setMyplayers(room.players);
    });
    socketRef.current.on("not-winner", (msg) => {
      alert(msg);
    });

    socketRef.current.on("next-player", ({ nextplayer, chitti }) => {
      if (nextplayer === player) {
        setrecivedchitti(true);
        playrecivedsound();
      }
    });

    socketRef.current.on("game-over", ({ winner }) => {
      setgameover(true);
      setWinner(winner);
    });
    return () => {
      socketRef.current.off("room-update");
      socketRef.current.off("not-winner");
      socketRef.current.off("next-player");
      socketRef.current.off("game-over");
      socketRef.current.disconnect();
    };
  }, [player, roomcode]);

  const currentPlayerData = Myplayers.find((p) => p.name === player);

  // ================= PASS =================
  function handlepassindex() {
    if (selectedIndex === null) return;
    if (currentPlayerData.chitti.length <= 4) {
      alert("you can't pass chitti");
      return;
    }

    socketRef.current.emit("pass-chitti", {
      roomcode,
      player,
      index: selectedIndex,
    });

    setSelectedIndex(null);
    setrecivedchitti(false);
  }

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };
  console.log(selectedIndex);

  return (
    <div className="creation-wrapper4">
      {gameover && (
        <div className="gameover-overlay">
          <h1>🎉 GAME OVER 🎉</h1>
          <h2>Winner: {winner}</h2>
        </div>
      )}
      <div className="container3">
        <div className="roominfo">
          <div>Room: {roomcode}</div>
          <div>| it's time to enjoy !</div>
        </div>

        {/* ================= PLAYERS ================= */}
        <div className="players-table">
          <div className="firsthalf">
            <div className="one">
              <div className="avatar">
                {Myplayers?.[0]?.name}
                <img className="player-img" src={minichild} alt="avatar" />
                host
              </div>
              <div className="player-info">
                [number of chitti's with in the player:
                {Myplayers?.[0]?.chitti?.length}]
                <div className= {Myplayers?.[0]?.chitti?.length === 5?"greendot":"nogreendot"}>
                </div>
              </div>
              
            </div>

            <div className="two">
              <div className="avatar">
                {Myplayers?.[1]?.name}
                <img className="player-img" src={male} alt="avatar" />
              </div>
              <div className="player-info">
                [number of chitti's with in the player:
                {Myplayers?.[1]?.chitti?.length}]
                 <div className= {Myplayers?.[1]?.chitti?.length === 5?"greendot":"nogreendot"}>
                </div>
              </div>
            </div>
          </div>

          <div className="secondhalf">
            <div className="three">
              <div className="avatar">
                {Myplayers?.[2]?.name}
                <img className="player-img" src={girl} alt="avatar" />
              </div>
              <div className="player-info">
                [number of chitti's with in the player:
                {Myplayers?.[2]?.chitti?.length}]
               <div className= {Myplayers?.[2]?.chitti?.length === 5?"greendot":"nogreendot"}>
                </div>
              </div>
            </div>

            <div className="four">
              <div className="avatar">
                {Myplayers?.[3]?.name}
                <img className="player-img" src={happykid} alt="avatar" />
              </div>
              <div className="player-info">
                [number of chitti's with in the player:
                {Myplayers?.[3]?.chitti?.length}]
                <div className= {Myplayers?.[3]?.chitti?.length === 5?"greendot":"nogreendot"}>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CENTER ================= */}
        <div className="circle">
          <div className="shooo">AY-HUNAAA..!</div>
        </div>

        <div
          className={disabled || gameover ? "nohurry" : "hurry"}
          onClick={!disabled && !gameover ? checkwinner : null}
        >
          SHOOO
        </div>

        <>
          <div className={recivedchitti ? "recived" : "notrecived"}>
            You received chitti
          </div>

          <audio ref={passAudioRef} src={recivedsound} preload="auto" />
        </>

        {/* ================= YOUR POCKET ================= */}
        <div className="mine">
          <h1>Your Pocket</h1>

          <div className="mycontent">
            <div className={hideit ? "mychittis" : "hidechitti"}>
              {currentPlayerData?.chitti?.map((chitti, index) => (
                <div
                  key={index}
                  className={`chitti ${
                    selectedIndex === index ? "selected" : ""
                  }`}
                  onClick={() => {
                    handleSelect(index);
                    playClickSound();
                  }}
                >
                  {chitti}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="controls">
          <button
            disabled={selectedIndex === null || gameover}
            className={selectedIndex === null || gameover ? "nopass" : "pass"}
            onClick={handlepassindex}
          >
            pass chitti
          </button>
          <>
            <button
              className="hide"
              onClick={() => {
                hide();
              }}
            >
              {hideit ? "hide" : "show"}
            </button>
            <audio ref={clickAudioRef} src={clicksound} preload="auto" />
          </>
        </div>
      </div>
      <footer className='gamezonefooter'>
          © {new Date().getFullYear()} Gurutej. All rights reserved.
    </footer>
    </div>
  );
};

export default Gamezone;
