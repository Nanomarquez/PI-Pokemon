import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonByName, clearPokemonDetails, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
import PokeNotFound from '../NotFound/PokeNotFound';
import "./style.css"
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