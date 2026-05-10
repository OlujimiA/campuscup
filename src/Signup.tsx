import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName },
        // Optional: explicitly set redirectTo if you want a custom confirmation page
        // emailRedirectTo: 'https://campus-cup.vercel.app/login'
      }
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      // Create profile record
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        role: 'player'
      });
      if (profileError) console.error('Profile creation error:', profileError);
      setMessage('Verification email sent! Please check your inbox and click the link to confirm your account.');
      setTimeout(() => navigate('/login'), 5000);
    }
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: '400px', marginTop: '100px' }}>
      <h1>Sign Up</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" required />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}

export default Signup;