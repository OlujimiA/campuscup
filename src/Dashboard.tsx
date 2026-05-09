import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Dashboard() {
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

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="bg-[#1a061e] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">CAMPUS CUP</div>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className="nav-link nav-link-active">Dashboard</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/standings" className="nav-link">Standings</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          {currentUser?.isAdmin && <Link to="/admin" className="nav-link">Admin Portal</Link>}
        </div>
        <div className="flex items-center space-x-3 md:space-x-6">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i className="fas fa-search text-xs"></i></span>
            <input type="text" placeholder="Search.." className="search-input w-32 md:w-48 pl-9 pr-4 py-2 rounded-full text-sm focus:outline-none" />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-white hover:opacity-70">
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>
            <button className="text-white hover:opacity-70"><i className="far fa-bell text-xl"></i></button>
            <button onClick={logout} className="text-pink-400 hover:opacity-70"><i className="fas fa-sign-out-alt text-xl"></i></button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
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

      {/* Main content (exactly from your index.html) */}
      <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full">
        <div className="page-view">
          {/* Score Card */}
          <section className="score-card w-full p-6 md:p-12 mb-8 md:mb-12 flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-[10px] font-bold text-gray-400 flex items-center space-x-2 border shadow-sm">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              <span>LIVE - 74'</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl space-y-8 md:space-y-0">
              <div className="flex flex-col items-center space-y-4">
                <div className="team-logo-bg w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shadow-sm">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1a061e] rounded-full flex items-center justify-center text-white font-black text-xl md:text-2xl">LIO</div>
                </div>
                <h2 className="text-lg md:text-2xl font-extrabold text-[#1a061e] text-center">Architecture 100L</h2>
                <span className="bg-pink-100 text-pink-500 text-[10px] font-bold px-4 py-1 rounded-full uppercase">Home</span>
              </div>
              <div className="text-6xl md:text-8xl font-black text-[#1a061e] flex items-center space-x-4">
                <span>2</span><span className="text-gray-200">-</span><span>1</span>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-[20px] shadow-sm">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-900 rounded-full flex items-center justify-center text-white font-black text-xl md:text-2xl">EAG</div>
                </div>
                <h2 className="text-lg md:text-2xl font-extrabold text-[#1a061e] text-center">Theatre Art 200L</h2>
                <span className="bg-pink-50 text-pink-300 text-[10px] font-bold px-4 py-1 rounded-full uppercase">Away</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-extrabold text-[#1a061e]">Match Feed</h3>
                <div className="flex space-x-2 md:space-x-4 text-[10px] md:text-xs font-bold">
                  <button className="text-gray-400">All Events</button>
                  <button className="bg-pink-100 text-pink-500 px-3 py-1 rounded-full">Goals Only</button>
                </div>
              </div>
              <div className="relative pl-12 space-y-8">
                <div className="timeline-line"></div>
                {/* Event 1 */}
                <div className="relative">
                  <div className="absolute -left-[52px] timeline-dot">74'</div>
                  <div className="match-event-card p-6 border-l-4 border-pink-500">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-pink-500 uppercase mb-2"><i className="fas fa-futbol"></i><span>Goal - Lions</span></div>
                    <h4 className="font-bold text-[#1a061e] text-lg mb-1">Chibueke</h4>
                    <p className="text-gray-400 text-sm">A stunning curling effort from outside the box finds the top right corner. Assist by J. Davis.</p>
                  </div>
                </div>
                {/* Event 2 */}
                <div className="relative">
                  <div className="absolute -left-[52px] timeline-dot bg-white border-2 border-pink-100 text-pink-300">62'</div>
                  <div className="match-event-card p-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase mb-2"><i className="fas fa-exchange-alt"></i><span>Substitution - Theatre Art 200L</span></div>
                    <div className="space-y-1 text-sm font-bold"><p className="text-green-500">In: T. Harris</p><p className="text-pink-500">Out: R. Madueke</p></div>
                  </div>
                </div>
                {/* Event 3 */}
                <div className="relative">
                  <div className="absolute -left-[52px] timeline-dot bg-white border-2 border-pink-100 text-pink-300">45+2'</div>
                  <div className="match-event-card p-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-yellow-500 uppercase mb-2"><i className="fas fa-square"></i><span>Yellow Card - Lions</span></div>
                    <h4 className="font-bold text-[#1a061e] mb-1">D. Ebuka</h4>
                    <p className="text-gray-400 text-sm">Booked for a late challenge in midfield.</p>
                  </div>
                </div>
                {/* Event 4 */}
                <div className="relative">
                  <div className="absolute -left-[52px] timeline-dot bg-white border-2 border-pink-100 text-pink-300">28'</div>
                  <div className="match-event-card p-6 border-l-4 border-purple-900">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-purple-900 uppercase mb-2"><i className="fas fa-futbol"></i><span>Goal - Eagles</span></div>
                    <h4 className="font-bold text-[#1a061e] text-lg mb-1">Monjaro</h4>
                    <p className="text-gray-400 text-sm">Close-range finish following a corner kick.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-50">
                <h3 className="text-xl font-extrabold text-[#1a061e] mb-8">Match Stats</h3>
                <div className="space-y-8 text-[10px] font-bold uppercase text-gray-400">
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>62%</span><span>Possession</span><span>38%</span></div>
                    <div className="stat-bar-bg flex"><div className="bg-[#1a061e]" style={{ width: '62%' }}></div><div className="bg-pink-100" style={{ width: '38%' }}></div></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>14</span><span>Shots</span><span>8</span></div>
                    <div className="stat-bar-bg flex"><div className="bg-[#1a061e]" style={{ width: '63.6%' }}></div><div className="bg-pink-100" style={{ width: '36.4%' }}></div></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>6</span><span>Shots on Target</span><span>3</span></div>
                    <div className="stat-bar-bg flex"><div className="bg-[#1a061e]" style={{ width: '66.6%' }}></div><div className="bg-pink-100" style={{ width: '33.3%' }}></div></div>
                  </div>
                </div>
              </div>
              <div className="commentary-box p-6 md:p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Join the Commentary</h3>
                  <p className="text-gray-400 text-xs mb-6">Share your thoughts on the match with other fans in the Live Hub.</p>
                  <button className="bg-white text-[#1a061e] text-[10px] font-black px-6 py-3 rounded-lg uppercase tracking-widest hover:bg-pink-50 transition-colors">Enter Hub</button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 border-[12px] border-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;