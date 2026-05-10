import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Admin() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const dark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(dark);
    if (dark) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');

    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user?.isAdmin) window.location.href = '/';
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
      <nav className="bg-[#1a061e] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white"><i className="fas fa-bars text-xl"></i></button>
          <div className="text-lg md:text-xl font-black text-white tracking-tighter uppercase">CAMPUS CUP</div>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/standings" className="nav-link">Standings</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <Link to="/admin" className="nav-link nav-link-active">Admin Portal</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input type="text" placeholder="Search..." className="bg-[#fce7f3] w-48 pl-4 pr-4 py-2 rounded-full text-xs focus:outline-none" />
          </div>
          <button onClick={toggleDarkMode} className="text-white hover:opacity-70">
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
          </button>
          <button onClick={logout} className="text-pink-400 hover:opacity-70"><i className="fas fa-sign-out-alt text-xl"></i></button>
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
          <Link to="/admin" className="text-white text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>Admin Portal</Link>
          <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-400 text-2xl font-bold mt-12 text-left">Logout</button>
        </div>
      </div>

      <main className="flex-grow p-4 md:p-12 max-w-7xl mx-auto w-full">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-[#1a061e] uppercase tracking-tighter mb-2">League Rules Configuration</h1>
          <p className="text-gray-500 font-medium max-w-3xl">Define the foundational logic for Match Point Allocation and Tie-Breaker Hierarchies. Changes here directly impact live standings.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Match Point Allocation */}
            <section className="config-card p-6 md:p-8 bg-white dark:bg-[#1a1a2e] rounded-2xl shadow">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-[#be185d]"><i className="fas fa-trophy"></i></div>
                <h2 className="text-xl font-black text-[#1a061e] dark:text-white uppercase">Match Point Allocation</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div><label className="text-[10px] font-bold text-[#be185d] uppercase block mb-2">Win Points</label><input type="text" defaultValue="3" className="w-full p-3 rounded bg-pink-50 dark:bg-[#2a2a4a] dark:text-white border-none" /></div>
                <div><label className="text-[10px] font-bold text-[#be185d] uppercase block mb-2">Draw Points</label><input type="text" defaultValue="1" className="w-full p-3 rounded bg-pink-50 dark:bg-[#2a2a4a] dark:text-white border-none" /></div>
                <div><label className="text-[10px] font-bold text-[#be185d] uppercase block mb-2">Loss Points</label><input type="text" defaultValue="0" className="w-full p-3 rounded bg-pink-50 dark:bg-[#2a2a4a] dark:text-white border-none" /></div>
                <div><label className="text-[10px] font-bold text-[#be185d] uppercase block mb-2">Bonus Points (Goal Diff &gt; 3)</label><input type="text" defaultValue="0" className="w-full p-3 rounded bg-pink-50 dark:bg-[#2a2a4a] dark:text-white border-none" /></div>
              </div>
            </section>

            {/* Tie-Breaker Hierarchy */}
            <section className="config-card p-6 md:p-8 bg-white dark:bg-[#1a1a2e] rounded-2xl shadow">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-[#be185d]"><i className="fas fa-list-ol"></i></div>
                <h2 className="text-xl font-black text-[#1a061e] dark:text-white uppercase">Tie-Breaker Hierarchy</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white dark:bg-[#2a2a4a] border dark:border-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4"><i className="fas fa-grip-vertical text-gray-300"></i><div className="w-6 h-6 bg-[#1a061e] text-white rounded-full flex items-center justify-center text-[10px] font-bold">1</div><span className="font-bold">Goal Difference</span></div>
                  <i className="fas fa-cog text-gray-300"></i>
                </div>
                <div className="flex justify-between items-center p-4 bg-white dark:bg-[#2a2a4a] border dark:border-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4"><i className="fas fa-grip-vertical text-gray-300"></i><div className="w-6 h-6 bg-[#1a061e] text-white rounded-full flex items-center justify-center text-[10px] font-bold">2</div><span className="font-bold">Goals Scored</span></div>
                  <i className="fas fa-cog text-gray-300"></i>
                </div>
                <div className="flex justify-between items-center p-4 bg-white dark:bg-[#2a2a4a] border dark:border-gray-700 rounded-xl">
                  <div className="flex items-center space-x-4"><i className="fas fa-grip-vertical text-gray-300"></i><div className="w-6 h-6 bg-[#1a061e] text-white rounded-full flex items-center justify-center text-[10px] font-bold">3</div><span className="font-bold">Head-to-Head Record</span></div>
                  <i className="fas fa-cog text-gray-300"></i>
                </div>
                <button className="w-full border-2 border-dashed border-pink-200 rounded-xl py-4 text-pink-500 font-bold text-xs uppercase tracking-widest hover:bg-pink-50">+ Add Tie-Breaker Criteria</button>
              </div>
            </section>
            <div className="flex justify-end space-x-4 pt-4">
              <button className="px-8 py-4 text-pink-500 font-black text-xs uppercase">Reset</button>
              <button className="px-8 py-4 bg-gray-100 text-gray-400 font-black text-xs uppercase rounded-xl cursor-not-allowed">Save Configuration</button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <section className="simulation-panel bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 md:p-8 shadow">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-3"><div className="w-2 h-2 rounded-full bg-red-500"></div><h2 className="text-xl font-black text-[#1a061e] dark:text-white uppercase">Live Simulation</h2></div>
                <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-1 rounded">Preview</span>
              </div>
              <p className="text-xs text-gray-400 font-medium mb-8">Previewing current rule set against live league data. Changes will reflect instantly here before saving.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-[10px] font-black text-gray-300 uppercase">
                    <tr><th className="pb-4">Pos</th><th className="pb-4">Team</th><th className="pb-4 text-center">PLD</th><th className="pb-4 text-center">GD</th><th className="pb-4 text-right">PTS</th></tr>
                  </thead>
                  <tbody className="text-sm font-bold text-[#1a061e] dark:text-white">
                    <tr className="border-b dark:border-gray-800"><td className="py-4">1</td><td>Software 200L</td><td className="text-center">28</td><td className="text-center text-green-500">+36</td><td className="text-right text-xl font-black">65</td></tr>
                    <tr className="border-b dark:border-gray-800"><td className="py-4">2</td><td>Software 100L</td><td className="text-center">28</td><td className="text-center text-green-500">+30</td><td className="text-right text-xl font-black">61</td></tr>
                    <tr className="border-b dark:border-gray-800"><td className="py-4">3</td><td>Chinedu's Team</td><td className="text-center">28</td><td className="text-center text-green-500">+24</td><td className="text-right text-xl font-black">57</td></tr>
                    <tr className="border-b dark:border-gray-800"><td className="py-4">4</td><td>Electrical Eng. 200L</td><td className="text-center">28</td><td className="text-center text-green-500">+15</td><td className="text-right text-xl font-black">53</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 rounded-xl flex items-start space-x-3">
                <i className="fas fa-info-circle text-red-500 mt-1"></i>
                <p className="text-[10px] text-red-800 dark:text-red-300 font-bold">Positions 1 and 2 are currently resolved by <span className="underline">Goals Scored</span> based on proposed hierarchy.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;