import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SearchPage from "./components/SearchPage";
import "./style.scss";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [averageSearchDuration, setAverageSearchDuration] = useState(0);

  const handleLogin = (user: string) => {
    setIsAuthenticated(true);
    setUsername(user);
    localStorage.setItem("username", user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    localStorage.removeItem("username");
  };

  const updateAverageSearchDuration = (duration: number) => {
    setAverageSearchDuration((prevAverage) => {
      if (prevAverage === 0) return duration;
      return (prevAverage + duration) / 2;
    });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                redirectPath="/login"
              />
            }
          >
            <Route
              path="/"
              element={
                <div className="mainContainer">
                  <Header
                    isAuthenticated={isAuthenticated}
                    username={username}
                    onLogout={handleLogout}
                    averageSearchDuration={averageSearchDuration}
                  />
                  <SearchPage
                    updateAverageSearchDuration={updateAverageSearchDuration}
                  />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
