import React from 'react'
import Landing from '../../assets/Landing.gif';
import {Link} from 'react-router-dom';

function BackToLandingPage() {
  return (
    <Link to='/'>
      <img style={{position:"absolute",width:"30px",height:"30px",top:"0",borderRadius:"50%",margin:"10px"}} src={Landing} alt="" />
    </Link>
  )
}

export default BackToLandingPage