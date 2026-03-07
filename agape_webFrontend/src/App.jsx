// configuracion de rutas con react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Login from './pages/Login';
//import AdminHome from './pages/adminHome.html';
import Home from './pages/Home';
import Login from './components/login';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </BrowserRouter>  
    );
}