import React from 'react'
import {Link} from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css'
import BackToLandingPage from '../BackToLandingPage/BackToLandingPage';

const NavBar = () => {


  return (
    <nav id='navbar' className={`${style.nav}`}>
      <BackToLandingPage/>
      <div className={`${style.leftLink}`}>
        <Link to="/home" className={`${style.link}`}>
          <h1 className={`${style.pHP}`}>Pokemon App</h1>
        </Link>
      </div>
      <div className={`${style.search}`}>
        <SearchBar />
      </div>
      <div className={`${style.rightLink}`}>
        <Link to='/create' className={`${style.link}`}>
          <h1 className={`${style.pCP}`} >Create Pokemon</h1>
        </Link>
      </div>
    </nav>
    )
  }

export default NavBar;