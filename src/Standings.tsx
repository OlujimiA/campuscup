import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Standings() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(dark);
    if (dark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser') || 'null'));
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

  const teams = [
    { name: 'Software 200L', points: 65, gf: 58, ga: 22, played: 28 },
    { name: 'Software 100L', points: 61, gf: 52, ga: 22, played: 28 },
    { name: 'Mechatronics 200L', points: 57, gf: 48, ga: 24, played: 28 },
    { name: 'Chinedu\'s Team', points: 57, gf: 52, ga: 28, played: 28 },
    { name: 'Electrical Eng. 200L', points: 53, gf: 45, ga: 30, played: 28 },
    { name: 'Civil Engineering 100L', points: 43, gf: 41, ga: 20, played: 28 }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <nav className="bg-[#1a061e] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white"><i className="fas fa-bars text-xl"></i></button>
          <div className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">CAMPUS CUP</div>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/standings" className="nav-link nav-link-active">Standings</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          {currentUser?.isAdmin && <Link to="/admin" className="nav-link">Admin Portal</Link>}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="text-white"><i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i></button>
          <button onClick={logout} className="text-pink-400 text-xs font-bold"><i className="fas fa-sign-out-alt mr-1"></i>Logout</button>
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
        <h1 className="text-4xl font-black text-[#1a061e] mb-8">League Standings</h1>
        <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-[#2a2a4a] text-gray-600 dark:text-gray-300 text-xs font-bold uppercase">
              <tr>
                <th className="px-6 py-4">Pos</th><th className="px-6 py-4">Team</th><th className="px-6 py-4 text-center">PLD</th><th className="px-6 py-4 text-center">GF</th><th className="px-6 py-4 text-center">GA</th><th className="px-6 py-4 text-right">PTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {teams.map((team, idx) => (
                <tr key={team.name} className="hover:bg-pink-50 dark:hover:bg-[#2a2a4a] transition">
                  <td className="px-6 py-4 font-bold">{idx+1}</td>
                  <td className="px-6 py-4 font-medium">{team.name}</td>
                  <td className="px-6 py-4 text-center">{team.played}</td>
                  <td className="px-6 py-4 text-center">{team.gf}</td>
                  <td className="px-6 py-4 text-center">{team.ga}</td>
                  <td className="px-6 py-4 text-right font-black text-xl">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Standings;