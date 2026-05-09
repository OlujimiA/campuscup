import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Teams from './Teams';
import Standings from './Standings';
import Profile from './Profile';
import Admin from './Admin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    setIsAuthenticated(!!user);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/teams" element={isAuthenticated ? <Teams /> : <Navigate to="/login" />} />
        <Route path="/standings" element={isAuthenticated ? <Standings /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;