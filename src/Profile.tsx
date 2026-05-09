import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(dark);
    if (dark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
    if (!user) window.location.href = '/login';
  }, []);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    localStorage.setItem('darkMode', newDark ? 'true' : 'false');
    if (newDark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  };

  const firstName = currentUser?.firstName || 'John';
  const lastName = currentUser?.lastName || 'Davis';
  const email = currentUser?.email || 'user@campuscup.com';

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <nav className="bg-[#1a061e] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white"><i className="fas fa-bars text-xl"></i></button>
          <div className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">CAMPUS CUP</div>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/standings" className="nav-link">Standings</Link>
          <Link to="/profile" className="nav-link nav-link-active">Profile</Link>
          {currentUser?.isAdmin && <Link to="/admin" className="nav-link">Admin Portal</Link>}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-white hover:opacity-70"><i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i></button>
          <button className="text-white hover:opacity-70"><i className="far fa-bell text-xl"></i></button>
          <button onClick={logout} className="text-pink-400 font-bold text-xs uppercase tracking-widest"><i className="fas fa-sign-out-alt mr-2"></i>Logout</button>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-[#1a061e] z-[60] flex flex-col p-8 lg:hidden ${mobileMenuOpen ? 'active' : ''}`} style={{ transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s' }}>
        <div className="flex justify-between items-center mb-12">
          <div className="text-xl font-black text-white uppercase">CAMPUS CUP</div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-white"><i className="fas fa-times text-2xl"></i></button>
        </div>
        <div className="flex flex-col space-y-6">
          <Link to="/" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/teams" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Teams</Link>
          <Link to="/standings" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Standings</Link>
          <Link to="/profile" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
          {currentUser?.isAdmin && <Link to="/admin" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Admin Portal</Link>}
          <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-400 text-2xl font-bold mt-12 text-left">Logout</button>
        </div>
      </div>

      <main className="flex-grow p-4 md:p-12 max-w-4xl mx-auto w-full">
        <div className="profile-card p-8 md:p-12 shadow-xl border border-pink-100">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 mb-12 border-b border-gray-100 pb-12">
            <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center text-[#1a061e] text-5xl font-black shadow-inner">
              {(firstName[0] + lastName[0]).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-[#1a061e] uppercase tracking-tighter">{firstName} {lastName}</h2>
              <p className="text-gray-400 font-medium">{email}</p>
              <div className="flex space-x-2 mt-4 justify-center md:justify-start">
                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Verified Fan</span>
                <span className="bg-purple-100 text-purple-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Lions Member</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Account Details</h3>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Username</p>
                <p className="font-bold text-[#1a061e]">{email.split('@')[0]}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</p>
                <p className="font-bold text-[#1a061e]">+234 812 345 6789</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Preferences</h3>
              <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl font-bold text-[#1a061e] hover:bg-pink-50"><span>Notifications</span><i className="fas fa-chevron-right text-gray-300"></i></button>
              <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl font-bold text-[#1a061e] hover:bg-pink-50"><span>Security & Privacy</span><i className="fas fa-chevron-right text-gray-300"></i></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;