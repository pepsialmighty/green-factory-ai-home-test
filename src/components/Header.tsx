import React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface HeaderProps {
  isAuthenticated: boolean;
  username: string;
  onLogout: () => void;
  averageSearchDuration: number;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  username,
  onLogout,
  averageSearchDuration,
}) => {
  return (
    <header className="headerContainer">
      <div className="headerGreet">
        <img src="images/logo.png" alt="" />
        <h1>Book Search</h1>
      </div>
      <div className="headerUltilityContainer">
        <div className="headerUltility">
          <>
            <AccountCircleIcon fontSize="large" sx={{ color: "#06342b" }} />
            &nbsp;
            <h3>Welcome, {username}!</h3>
          </>
          <button onClick={onLogout}>
            <LogoutIcon onClick={onLogout} />
          </button>
        </div>
        <div className="searchDuration">
          Average search duration: {averageSearchDuration.toFixed(2)} ms
        </div>
      </div>
    </header>
  );
};

export default Header;
