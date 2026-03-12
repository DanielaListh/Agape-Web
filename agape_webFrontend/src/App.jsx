// configuracion de rutas con react router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Register';
import AdminHome from './pages/AdminHome';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

export default function App() {
    return (
        <BrowserRouter>
            
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/registro" element={<PublicLayout><Registro /></PublicLayout>} />
                {/* Rutas admin */}
                <Route path="/adminHome" element={<AdminLayout><AdminHome /></AdminLayout>} />
            </Routes>
        </BrowserRouter>  
    );
}