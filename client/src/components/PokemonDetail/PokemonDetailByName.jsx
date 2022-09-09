import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonByName, clearPokemonDetails, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import PokeNotFound from '../NotFound/PokeNotFound';
import style from './PokemonDetail.module.css';
import { useNavigate } from "react-router-dom";

export default function PokemonDetailByName () {
  const navigate = useNavigate();
  const [name,setName] = useState("")
  useEffect(() => {
    const url = window.location.href.split("/")
    const name=url[url.length-1]
    setName(name)
  },[name,setName])
  const dispatch = useDispatch()
  const pokemonDetail = useSelector(state =>                      state.detailPokemon)
  console.log(pokemonDetail);
  useEffect(() => {
    dispatch(clearPokemonDetails())
    dispatch(getPokemonByName(name))
    console.log(name)
  }, [name, dispatch])
  
  const handleDelete = () => {
    dispatch(deletePokemon(pokemonDetail.id))
    alert("Pokemon deleted")
    navigate('/home')
  }

  if (pokemonDetail === 'Pokemon not found' || !name ) return <PokeNotFound />;
  if (Object.keys(pokemonDetail).length === 0) return <Loading />;
  else {
  return (
    <div className={`${style.divContainer}`} >
      {pokemonDetail && 
        <div className={`${style.divCardDetail}`} >
          <div className={`${style.divCardImageName}`}>
          <img className={`${style.img}`} src={pokemonDetail.image} alt={pokemonDetail.name}/>
          <h1 className={`${style.name}`} >{pokemonDetail.name}</h1>
          </div>
          <div className={`${style.rightContainer}`} >
            <div className={`${style.divTypeContainer}`}>
              {pokemonDetail.type && pokemonDetail.type.map((type, index) => (
                <div key={index} className={`${style[type]}`}>
                  {type}
                </div>
              ))}
            </div>
            <div className={`${style.divStatsContainer}`}>
              <div className={`${style.stat1}`} >
                <p className={`${style.hp}`} >HP: {pokemonDetail.hp}</p>
                <p className={`${style.attack}`} >Attack: {pokemonDetail.attack}</p>
              </div>  
              <div className={`${style.stat2}`} >
                <p className={`${style.defense}`} >Defense: {pokemonDetail.defense}</p>
                <p className={`${style.speed}`} >Speed: {pokemonDetail.speed}</p>
              </div>  
              <div className={`${style.stat3}`} >
                <p className={`${style.height}`} >Height: {pokemonDetail.height}</p>
                <p className={`${style.weight}`} >Weight: {pokemonDetail.weight}</p>
              </div>  
            </div>

          </div>
        </div>
      }
      <div className={`${style.divButtons}`} >
          <Link to='/home'>
            <button className={`${style.buttonToHome} ${style.button}`}>Go to Home</button>
          </Link>
          {pokemonDetail && pokemonDetail?.id?.length > 30 && <button className={`${style.buttonDel} ${style.button}`} onClick={handleDelete}> Delete Pokemon </button>}
        </div>
    </div>
    )
  }
}