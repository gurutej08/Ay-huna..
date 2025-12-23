import React from 'react'
import Gemini_Generated_Image_jyv5mijyv5mijyv5 from '../assets/Gemini_Generated_Image_jyv5mijyv5mijyv5.png'
import { useState } from 'react'
import { useEffect } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import Lobby from './Lobby'
import Screenshot_2025 from "../assets/Screenshot_2025.png"
import Hostzone from './Hostzone'

const Home = () => {
    const navigate=useNavigate()
    function handleclick(){
        navigate("/lobby");
    }
    function handleclicks(){
        navigate("/Hostzone")
    }
    const [bg, setbg] = useState({background: `linear-gradient(120deg,rgba(198,67,167, 0.4) 50%)`})
    useEffect(() => {
        const intervel=setInterval(() => {
            let random=Math.random();
            let random1=Math.random();
            let random2=Math.random();
            let a=150+(Math.ceil(random*100));
            let b=150+(Math.ceil(random1*100));
            let c=150+(Math.ceil(random2*100));
            setbg({background: `linear-gradient(120deg,rgb(${a},${c},${b}, 0.6) 50%)`});
        },500)
        return ()=>{
            clearInterval(intervel);
        }    
    }, [bg])      
  return (
    <div className="creation">
        <div className='container' style={bg} >
        
        <div className='logo'>
            <img src={Screenshot_2025} alt="logo"/>
            <h1 style={{color:'black'}}> SHoOo..! </h1>
        </div>
        <div className='main-buttons'>
            <div className="host">
                <div className="btncreate" onClick={handleclicks}>
                    Create Game
                </div>
            </div>
            <div className="join">
                <div className='btnjoin'  onClick={handleclick}>
                    Join game
                </div>
            </div>
            <div className="quote">
                hope you enjoy the game ,lets go guys👍
            </div>

        </div>
        
    </div>
    <footer className='homefooter'>
          © {new Date().getFullYear()} Gurutej. All rights reserved.
    </footer>
    </div>
  )
}

export default Home