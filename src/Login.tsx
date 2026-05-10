import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/');
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className="btn-primary">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;