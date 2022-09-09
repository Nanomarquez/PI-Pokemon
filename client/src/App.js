import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css"
import { Route,Routes } from "react-router-dom";
import Home from './components/Home/Home';
import NavBar from "./components/NavBar/NavBar";
import PokemonDetail from './components/PokemonDetail/PokemonDetailById';
import PokemonDetailByName from './components/PokemonDetail/PokemonDetailByName';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import NotFound from './components/NotFound'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>       
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path="/pokemon/:id" element={<PokemonDetail/>}/>
        <Route exact path="/pokemon/search/:name" element={<PokemonDetailByName/>} />
        <Route exact path="/create" element={<PokemonCreate/>} />
        <Route path="/" element={<NotFound/>} />
      </Routes>
    </>
  );
}

export default App;
