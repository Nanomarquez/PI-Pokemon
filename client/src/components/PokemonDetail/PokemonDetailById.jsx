import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDetails, clearPokemonDetails, getPokemons, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import PokeNotFound from '../NotFound/PokeNotFound';
import style from './PokemonDetail.module.css';
import { useNavigate } from "react-router-dom";

export default function PokemonDetail (props) {
  const [id,setId] = useState("")
  useEffect(() => {
    const url = window.location.href.split("/")
    const id=url[url.length-1]
    setId(id)
  },[setId])
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const pokemonDetail = useSelector(state => state.detailPokemon)
  const idPokemon = id
  const pokemons = useSelector(state => state.pokemons)
  useEffect(() => {
    dispatch(clearPokemonDetails())
    dispatch(getPokemonDetails(idPokemon))
  }, [idPokemon, dispatch])

  useEffect(() => {
    pokemons.length === 0 && dispatch(getPokemons())
  }, [dispatch,pokemons.length])

  const handleDelete = () => {
    dispatch(deletePokemon(idPokemon))
    alert("Pokemon deleted")
    navigate('/home')
  }
    
  // console.log(pokemonDetail.name);

  if (pokemonDetail === 'Pokemon not found') return <PokeNotFound />
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
        {idPokemon.length > 30 && <button className={`${style.buttonDel} ${style.button}`} onClick={handleDelete}> Delete Pokemon </button>}
      </div>
    </div>
    )
  }
}