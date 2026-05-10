import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    if (dark) document.documentElement.classList.add('dark-mode');
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, role: 'player' },
        emailRedirectTo: window.location.origin,
      }
    });
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSuccess(true);
    // Create profile record
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        first_name: firstName,
        last_name: lastName,
        role: 'player'
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#fdf2f8]">
        <div className="bg-white p-8 rounded-2xl text-center max-w-md">
          <i className="fas fa-envelope text-5xl text-[#be185d] mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-600">We sent a verification link to <strong>{email}</strong>. Click it to activate your account.</p>
          <Link to="/login" className="inline-block mt-6 text-[#be185d] font-bold">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#1a061e] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-wider uppercase">CAMPUS CUP</div>
          <button onClick={toggleDarkMode} className="text-white hover:opacity-70"><i className="fas fa-moon text-xl"></i></button>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="login-card w-full max-w-md p-8 rounded-lg shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a061e] mb-2 uppercase">Create Account</h1>
            <p className="text-gray-500 text-sm">Join the Campus Cup experience.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn-primary w-full text-white font-bold py-4 rounded-lg uppercase tracking-widest mt-4">Sign Up</button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Already have an account? <Link to="/login" className="text-[#be185d] font-bold hover:underline">Login</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;