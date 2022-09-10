import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonByName, clearPokemonDetails, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
import PokeNotFound from '../NotFound/PokeNotFound';
import "./style.css"
import { useNavigate,Link } from "react-router-dom";

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
  useEffect(() => {
    dispatch(clearPokemonDetails())
    dispatch(getPokemonByName(name))
    var value = "0px";
    document.getElementById('navbar').style.transform=`translate(0,${value})`;
    console.log(name)
  }, [name, dispatch])
  
  const handleDelete = () => {
    dispatch(deletePokemon(pokemonDetail.id))
    navigate('/home')
  }
  if (pokemonDetail === 'Pokemon not found') return <PokeNotFound />;
  if (pokemonDetail.name === undefined) return <Loading />;
  else {
    return(
        <div className='hero'>
                                  <Link className='link-to-back' to='/home' style={{weight:"100px",padding:"10px",borderRadius:"10px",textDecoration:"none",left:"20px",bottom:"20px",position:"absolute"}}>{"< "}Back</Link>
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