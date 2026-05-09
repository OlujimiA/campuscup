import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Teams() {
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
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white"><i className="fas fa-bars text-xl"></i></button>
          <div className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">CAMPUS CUP</div>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/teams" className="nav-link nav-link-active">Teams</Link>
          <Link to="/standings" className="nav-link">Standings</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          {currentUser?.isAdmin && <Link to="/admin" className="nav-link">Admin Portal</Link>}
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative hidden sm:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><i className="fas fa-search text-xs"></i></span>
            <input type="text" placeholder="Search teams..." className="bg-[#2d0a33] w-48 pl-9 pr-4 py-2 rounded-full text-xs focus:outline-none border border-white/10" />
          </div>
          <div className="flex items-center space-x-4 text-white">
            <button onClick={toggleDarkMode} className="hover:opacity-70">
              <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>
            <button className="hover:opacity-70"><i className="far fa-bell text-xl"></i></button>
            <button onClick={logout} className="text-red-400 hover:opacity-70"><i className="fas fa-sign-out-alt text-xl"></i></button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
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

      {/* Main content from teams.html */}
      <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-[#1a061e] uppercase tracking-tighter mb-4">
            LEAGUE <span className="text-[#be185d]">TEAMS</span>
          </h1>
          <p className="text-gray-500 max-w-2xl font-medium leading-relaxed">
            Explore the current roster of teams competing in the Lion's Edge premier league. Analyze performance, view standings, and track your favorites.
          </p>
        </header>

        {/* Filters */}
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl flex flex-col md:flex-row justify-between items-center mb-10 gap-4 shadow-sm">
          <div className="flex space-x-3">
            <button className="filter-btn filter-btn-active">All Teams</button>
            <button className="filter-btn filter-btn-inactive">Group A</button>
            <button className="filter-btn filter-btn-inactive">Group B</button>
          </div>
          <div className="flex items-center space-x-4 text-xs font-bold text-gray-400">
            <span>Sort by:</span>
            <div className="flex items-center space-x-2 text-[#1a061e] cursor-pointer">
              <span>Rank</span>
              <i className="fas fa-chevron-down text-[10px]"></i>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Software 100L (My Team) */}
          <div className="team-card-v2 relative">
            <div className="my-team-tag">My Team</div>
            <div className="card-gradient-software h-[100px] bg-gradient-to-b from-[#1a061e] to-[#f472b6]"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-[#1a061e] rounded-full flex items-center justify-center text-white font-black text-xs">LIO</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Software 100L</h3>
                <span className="rank-badge rank-green">Rank #2</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Eastern Division • 12-4-2</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">38</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">45</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">22</p></div>
              </div>
            </div>
          </div>
          {/* Mechatronics 200L */}
          <div className="team-card-v2 relative">
            <div className="card-gradient-mechatronics h-[100px] bg-gradient-to-b from-[#fce7f3] to-[#fae8ff]"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-cyan-900 rounded-full flex items-center justify-center text-white font-black text-xs">MEC</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Mechatronics 200L</h3>
                <span className="rank-badge rank-purple">Rank #1</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Northern Division • 15-2-1</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">46</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">52</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">18</p></div>
              </div>
            </div>
          </div>
          {/* Civil Engineering 100L */}
          <div className="team-card-v2 relative">
            <div className="card-gradient-civil h-[100px] bg-gradient-to-b from-[#fecaca] to-white"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center text-white font-black text-xs">ST</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Civil Engineering 100L</h3>
                <span className="rank-badge rank-pink">Rank #2</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Western Division • 14-3-1</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">43</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">41</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">20</p></div>
              </div>
            </div>
          </div>
          {/* Software 200L */}
          <div className="team-card-v2 relative">
            <div className="h-[100px] bg-gradient-to-b from-[#1e1b4b] to-[#4338ca]"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-indigo-900 rounded-full flex items-center justify-center text-white font-black text-xs">S2</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Software 200L</h3>
                <span className="rank-badge rank-green">Rank #1</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Eastern Division • 20-5-3</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">65</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">58</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">22</p></div>
              </div>
            </div>
          </div>
          {/* Chinedu's Team */}
          <div className="team-card-v2 relative">
            <div className="h-[100px] bg-gradient-to-b from-[#450a0a] to-[#991b1b]"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-red-900 rounded-full flex items-center justify-center text-white font-black text-xs">CT</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Chinedu's Team</h3>
                <span className="rank-badge rank-purple">Rank #3</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Southern Division • 17-6-5</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">57</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">52</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">28</p></div>
              </div>
            </div>
          </div>
          {/* Electrical Engineering 200L */}
          <div className="team-card-v2 relative">
            <div className="h-[100px] bg-gradient-to-b from-[#0f172a] to-[#1e293b]"></div>
            <div className="team-logo-overlay">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs">EE</div>
            </div>
            <div className="px-6 pt-12 pb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-black text-[#1a061e]">Electrical Eng. 200L</h3>
                <span className="rank-badge rank-pink">Rank #4</span>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Western Division • 15-8-5</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center">
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">PTS</p><p className="text-lg font-black text-[#1a061e]">53</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GF</p><p className="text-lg font-black text-[#1a061e]">45</p></div>
                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-1">GA</p><p className="text-lg font-black text-[#1a061e]">30</p></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Teams;