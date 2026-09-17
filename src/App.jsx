import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';

// Landing.jsx expects onNavigateToLogin / onNavigateToRegister callbacks
// rather than routing directly, so this thin wrapper supplies them.
function LandingRoute() {
  const navigate = useNavigate();
  return (
    <Landing
      onNavigateToLogin={() => navigate('/login')}
      onNavigateToRegister={() => navigate('/register')}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;