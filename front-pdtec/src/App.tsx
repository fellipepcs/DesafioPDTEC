import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Router
} from "react-router-dom";
import Login from './pages/Login';
import { Home } from './pages/home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home></Home>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
