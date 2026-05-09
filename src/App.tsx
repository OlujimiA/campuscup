//my front end
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LiveMatch from './LiveMatch';
import StandingsPage from './StandingsPage';
import TeamsPage from './TeamsPage';
import ProfilePage from './ProfilesPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh'}}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/match/:id" element={<LiveMatch />} />
          <Route path="/standings" element={<StandingsPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;