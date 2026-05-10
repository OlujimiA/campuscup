import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Teams from './Teams';
import Standings from './Standings';
import Profile from './Profile';
import Admin from './Admin';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  if (loading) return <div className="dashboard-container">Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!session ? <Signup /> : <Navigate to="/" />} />
        <Route path="/" element={session ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/teams" element={session ? <Teams /> : <Navigate to="/login" />} />
        <Route path="/standings" element={session ? <Standings /> : <Navigate to="/login" />} />
        <Route path="/profile" element={session ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/admin" element={session ? <Admin /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;