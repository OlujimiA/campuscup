import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

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
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      alert('An account with this email already exists.');
      return;
    }
    users.push({ firstName, lastName, email, password, isAdmin });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created successfully! Please login.');
    navigate('/login');
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#1a061e] mb-2 uppercase">Create Account</h1>
            <p className="text-gray-500 text-sm">Join the Lion's Edge stadium experience.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            </div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field w-full px-4 py-3 rounded-lg" required />
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="admin-signup" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} className="w-4 h-4 text-[#be185d] rounded" />
              <label htmlFor="admin-signup" className="text-sm text-gray-600">Admin Account</label>
            </div>
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