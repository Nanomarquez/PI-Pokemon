import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDetails, clearPokemonDetails, getPokemons, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
//import { Link } from 'react-router-dom';
import PokeNotFound from '../NotFound/PokeNotFound';
//import style from './PokemonDetail.module.css';
import { useNavigate } from "react-router-dom";
import "./style.css"
export default function PokemonDetail () {
  const [id,setId] = useState("")
  useEffect(() => {
    const url = window.location.href.split("/")
    const id=url[url.length-1]
    setId(id)
    console.log(id)
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
    return(
        <div className='hero'>
          <div className='card'>
            <div className='circle'></div>
            <div className='content'>
              <h2>{pokemonDetail.name}</h2>
              <div className='left'>
              <div className='stats'>
              <div>
                  <p>HP/Life: {pokemonDetail.hp}</p>
                  <p>Attack: {pokemonDetail.attack}</p>
                </div>  
                <div>
                  <p>Defense: {pokemonDetail.defense}</p>
                  <p>Speed: {pokemonDetail.speed}</p>
                </div>  
                <div>
                  <p>Height: {pokemonDetail.height}</p>
                  <p>Weight: {pokemonDetail.weight}</p>
                </div> 
              </div>
              <div className="types">
                {pokemonDetail.type && pokemonDetail.type.map((type, index) => (
                  <div key={index} className={`type ${[type]}`}>
                    {type}
                  </div>
                ))}            {pokemonDetail && pokemonDetail?.id?.length > 30 && <button onClick={handleDelete}> Delete Pokemon </button>}
              </div>
              </div>
            </div>
            <img src={pokemonDetail.image} alt="" />
          </div>
        </div>
    )
  }
}