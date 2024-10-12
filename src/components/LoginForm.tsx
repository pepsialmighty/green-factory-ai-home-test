import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { authenticateUser } from "../utils/auth";

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // user authentication
    const user = authenticateUser(username, password);
    if (user) {
      setError("");
      onLogin(user.username);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="loginForm">
      <h2>Welcome to Book Search App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" aria-label="login">
          <ArrowForwardIcon fontSize="large" />
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
