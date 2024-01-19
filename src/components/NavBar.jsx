import "./navbar.css";
import marvel_logo from "../assets/marvel-logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img src={marvel_logo} alt="marvel-logo" className="marvel-img" />
        <Link to="/" className="home-link">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
