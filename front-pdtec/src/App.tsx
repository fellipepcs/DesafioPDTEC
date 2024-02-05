import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import { Perfil } from './pages/Perfil';


function App() {
  return (
    <><Toaster position="top-right" /><BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter></>
  );
}

export default App;
