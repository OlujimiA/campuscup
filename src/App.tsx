import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Teams from "./Teams";
import Standings from "./Standings";
import Profile from "./Profile";
import Admin from "./Admin";

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function checkUser() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
      <Route
        path="/login"
        element={!user ? <Login onLogin={checkUser} /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup onLogin={checkUser} /> : <Navigate to="/" />}
      />

        {/* Protected routes */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/teams"
          element={user ? <Teams /> : <Navigate to="/login" />}
        />
        <Route
          path="/standings"
          element={user ? <Standings /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;