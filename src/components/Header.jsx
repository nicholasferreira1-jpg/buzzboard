// Header.jsx
import './Header.css';
import { Link } from "react-router-dom"; 

function Header({postCount}) {
  return (
    <header className="app-header">
        <h1 className="logo">🐝 BuzzBoard</h1>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
        { postCount > 0 && (
        <div>
          <span className="post-badge">{postCount}</span>
        </div>
        ) }
        <button className="post-btn">New Post</button>
    </header>
  );
}

export default Header;
