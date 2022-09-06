import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css"
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>

        <Route exact path='/' element={<LandingPage/>}/>       

      </Routes>
    </>
  );
}

export default App;
