import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemonDetails, clearPokemonDetails, getPokemons, deletePokemon } from '../../redux/actions';
import Loading from '../Loading/Loading';
import PokeNotFound from '../NotFound/PokeNotFound';
import { useNavigate ,Link } from "react-router-dom";
import "./style.css"
export default function PokemonDetail () {
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
    var value = "0px";
    document.getElementById('navbar').style.transform=`translate(0,${value})`;
  }, [idPokemon, dispatch])
  console.log("detalle: "+pokemonDetail.name)
  useEffect(() => {
    pokemons.length === 0 && dispatch(getPokemons())
  }, [dispatch,pokemons.length])

  const handleDelete = () => {
    dispatch(deletePokemon(idPokemon))
    navigate('/home')
  }
    
  // console.log(pokemonDetail.name);

  if (pokemonDetail === 'Pokemon not found') return <PokeNotFound />
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