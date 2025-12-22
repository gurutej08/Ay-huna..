import React , {useEffect,useRef} from 'react';
import Screenshot_2025 from '../assets/Screenshot_2025.png';
import './Creation.css';
import { useNavigate,useLocation  } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import io from 'socket.io-client';

const Creation = () => {

  const {state}= useLocation();
  const roomcode = state?.roomcode;
  const player = state?.player;
  const ishost = state?.ishost;
  console.log("state:",player,roomcode,ishost);
  const socketRef = useRef(null);
  const navigate = useNavigate();


  const { register,
    handleSubmit,
    formState: { errors } } = useForm();

    
   useEffect(() => {

    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", () => {
        console.log("Connected:", socketRef.current.id);
        socketRef.current.emit("join-room",{player,roomcode});
    }); 

    socketRef.current.on("room-update", (room) => {
      console.log("ROOM UPDATE:", room);
    });

    

    return () => {
      socketRef.current.disconnect();
    };  

  }, []);  
  function onsubmit(data){
    console.log(data);
    socketRef.current.emit("chitti-into",{
      player,
      roomcode,
      chitti:data.chitti,
      ishost,
    });

    navigate("/Gamezone",{
      state:{
        roomcode:roomcode,
        player:player,
        ishost:ishost,
      }
    });
    localStorage.setItem("roomcode", roomcode);
    localStorage.setItem("player", player);
    localStorage.setItem("ishost", ishost);

  }

  return (
    <div className="creation-wrapper2">
      <div className="myrotate">
        <div className='container2'>
          <div className='logo2'>
            <img src={Screenshot_2025} alt="logo"/>
            <h1 style={{color:'black'}}> SHoOo..! </h1>
          </div>
          <div className='sub-heading'>
            <h2>Create Your Chitti !</h2>
          </div>
          <div className='word'>
            <form  onSubmit={handleSubmit(onsubmit)}>
              <label>Enter the word or phrase for your chitti:</label>
               <br/>
              <input type="text"
              {...register("chitti", { required:true,
                minLength:{value:4,message:"invalid"},
                pattern: { value: /^[A-Za-z]+$/, message: "only alphabets"}
               })}
              />
              {errors.chitti && <p className='error3'>{errors.chitti.message}</p>}

              <div id='submit-chitti'>
                <button className='subtbtn'>SUBMIT CHITTI</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default Creation;
