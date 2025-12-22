import React, {  useEffect, useRef } from "react";
import "./Hostzone.css";
import Screenshot_2025 from "../assets/Screenshot_2025.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Hostzone = () => {
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    socketRef.current = io("https://ayhuna-backend.onrender.com");

    socketRef.current.on("connect", () => {
      console.log("Connected:", socketRef.current.id);
    });

    socketRef.current.on("room-created", (data) => {
      console.log("Room created:", data);
      navigate("/Waiting",{
        state:{
          roomcode:data.roomcode,
          player:data.host,
          ishost:true,
        }
      });
    });

    socketRef.current.on("room-error", (msg) => {
      alert(msg);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [navigate]);

  function onsubmit(data) {
    socketRef.current.emit("create-room", {
      player: data.playername,
      roomcode: data.createroomcode,
    });
  }


  return (
    <div className="backclr">
      <div className="hostboard">
        <div className="logo5">
          <img src={Screenshot_2025} alt="logo" />
          <h1 style={{ color: "black" }}> SHoOo..!</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onsubmit)} className="form-host">
            <div className="playername1">
              <label className="form-label">playername :</label>
              <input
                className="form-input"
                type="text"
                placeholder=" LUCKY"
                {...register("playername", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "name should have min 4 character",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "only alphabets allowed",
                  },
                })}
              />
              {errors.playername && (
                <p className="error1">{errors.playername.message}</p>
              )}
            </div>

            <div className="createroomcode">
              <label className="form-label">create room code:</label>
              <input
                className="form-input"
                type="number"
                placeholder="123456"
                {...register("createroomcode", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "room code must be 6 digits",
                  },
                })}
              />
              {errors.createroomcode && (
                <p className="error1">{errors.createroomcode.message}</p>
              )}
            </div>

            <div>
              <button id="bttn" >lets go into ay-hunaa world</button>
            </div>
          </form>
        </div>
      </div>
      <div className="create">create</div>

      <div className="share">share</div>

      <div className="play">play</div>

      <div className="exchange">exchange</div>
    </div>
  );
};

export default Hostzone;
