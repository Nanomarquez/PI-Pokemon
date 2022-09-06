import React from 'react'
import style from "./LandingPage.module.css";
import {Link} from 'react-router-dom';
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function LandingPage() {

  const handleClickVideo = () =>{
    const video = document.getElementById('video');
    video.muted= !video.muted
  } 

  setTimeout(function(){
    document.getElementById('afterIntro').style.opacity=1
  },5500)

  return (
    <div className={style.hero}>
      <div onChange={handleClickVideo}>
      <ToggleSwitch label=' '/>
      <p className={style.parrafe}>Press YES for a better experience</p>
      </div>
      <video id='video' autoPlay muted loop src="/Videos/pokemon.mp4" style={{position:'absolute',width:'100%',left:'50%',top:'50%',height:'100%',objectFit:'cover',transform:'translate(-50%, -50%)',zIndex:'-1'}}>
      </video>
      <div className={style.content} id='afterIntro'>
        <h1>POKEMON</h1>
         <Link to='/home' className={style.btn}>
         Gotta catch 'em all!
         </Link>
      </div>
    </div>
  )
}

export default LandingPage