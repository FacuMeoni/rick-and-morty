import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Favorite from './pages/favorite/Favorites';
import Navbar from './components/navbar/Navbar';
import About from './pages/about/About';


function App() {
  
  const location = useLocation();


  return (
    <div className="App">
     {location.pathname !== '/' && location.pathname !== '/register' ? <Navbar/> : null}
     <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/favorites' element={<Favorite/>}/>
        <Route exact path='/about' element={<About/>}/>
     </Routes>
    </div>
  );
}

export default App;
