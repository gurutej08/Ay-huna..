import React, { useState,useEffect } from 'react'
import './Lobby.css'
import Screenshot_2025 from '../assets/Screenshot_2025.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import pointingman1 from '../assets/pointingman1.png'
import io from "socket.io-client";

const socket = io("https://ayhuna-backend.onrender.com");

const Lobby = () => {
  const navigate=useNavigate()
  
  const [a,seta]=useState({boxShadow: '1px 1px 10px yellow'});
  const [a1,seta1]=useState({boxShadow: '1px 1px 10px yellow'});
  const [Inputcolor, setInputcolor] = useState({background:`linear-gradient(120deg, rgba(69, 233, 69, 0.79) 2%,rgb(222, 222, 71) 90%)`})
  const [Inputcolor1, setInputcolor1] = useState({background:`linear-gradient(120deg, rgba(69, 233, 69, 0.79) 2%,rgb(222, 222, 71) 90%)`})




  const handleclick =()=>{
    setInputcolor({background:'white'});
    seta({boxShadow:'none'});
  }
  const handleclick1 =()=>{
    setInputcolor1({background:'white'});
    seta1({boxShadow:'none'});
  }


  useEffect(() => {
  socket.on("room-error", (msg) => {
    alert(msg);
  });
  socket.on("room-update", (roomData) => {
    console.log("ROOM UPDATE:", roomData);
  });
  

  return () => socket.off("room-error");
}, [navigate]);




const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitform(data){

  socket.emit("join-room", {
    player: data.playername,
    roomcode: data.roomcode
  });
  navigate("/Waiting",{
    state:{
    player: data.playername,
    roomcode: data.roomcode,
    ishost:false,
    }
  });
}



  return (
    <div className="creation-wrapper1">
      <div className='container1'>
      <div className='logo1'>
        <img src={Screenshot_2025} alt="logo"/>
        <h1> SHoOo..! </h1>
      </div>
      <form  className='lobby-form' onSubmit={handleSubmit(submitform)}>
        <div className="playername">
          <label className='labels'>Enter Player Name:</label>
          <input className='inpt2' type="text" onClick={handleclick1} style={{...Inputcolor1, ...a1}} placeholder='GURU VARUN TEJ'
          {...register('playername',{required: true ,
          minLength:{value:4,message:"name should have min 4 character"},
          pattern: { value: /^[A-Za-z]+$/, message: "only alphabets allowed" }
           })}/>
          {errors.playername && <p className='error1'>{errors.playername.message}</p>}
        </div>
        <div className="room-code">
          <label className='labels'>Enter Your Room Code:</label>
          <input className='inpt1' onClick={handleclick} style={{ ...Inputcolor, ...a}} type="text" placeholder='123456'
          {...register('roomcode',{ required: true,
          pattern: { value: /^[0-9]{6}$/, message: "room code must be 6 digits" }
        })}/>
        {errors.roomcode && <p className='error1'>{errors.roomcode.message}</p>}

        </div>
        <div>
          <div className="start-button">
          <button className='joinroom'>Join Room</button>
        </div>
        </div>
      </form>
      <div className="inlobby">
        <h3>weclome guyzzz ❤️ </h3>
        <div className="players">
          hope you will enjoy it
        </div>
        <div className="players">
            connect and start the game
        </div>
      </div>
    </div>
    </div>
  )
}

export default Lobby