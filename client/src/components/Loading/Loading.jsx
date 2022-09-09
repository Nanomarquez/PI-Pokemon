import React from 'react'
import LOADING_IMG from '../../assets/pokeball.gif'
import style from './Loading.module.css'

const Loading = () => {
  return (
    <div className={`${style.divLoading}`}>
                <img src={LOADING_IMG} alt="loading" width="150" height="150" />
            </div>
  )
}

export default Loading