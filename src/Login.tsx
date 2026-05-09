import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    if (dark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, []);

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded admin login
    if (email === 't@gmail.com' && password === 'ttt') {
      const adminUser = {
        firstName: 'Admin',
        lastName: 'User',
        email: 't@gmail.com',
        password: 'ttt',
        isAdmin: true
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      onLogin();
      navigate('/');
      return;
    }

    // Normal user login from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid email or password. Please sign up first!');
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
    onLogin();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-[#1a061e] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-wider uppercase">CAMPUS CUP</div>
          <button onClick={toggleDarkMode} className="text-white hover:opacity-70">
            <i className="fas fa-moon text-xl"></i>
          </button>
        </div>
      </nav>
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="login-card w-full max-w-md p-8 rounded-lg shadow-xl">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a061e] mb-2 uppercase tracking-tight">Secure Access Portal</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to enter the stadium.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#1a061e] text-sm font-semibold mb-2">Email / Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i className="far fa-user text-sm"></i></span>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none" placeholder="user@campuscup.com" required />
              </div>
            </div>
            <div>
              <label className="block text-[#1a061e] text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i className="fas fa-lock text-sm"></i></span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none" placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full text-white font-bold py-4 rounded-lg uppercase tracking-widest">Login</button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Don't have an account? <Link to="/signup" className="text-[#be185d] font-bold hover:underline">Sign Up</Link></p>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-400 text-xs">© 2026 Campus Cup. All rights reserved.</footer>
    </div>
  );
}

export default Login;