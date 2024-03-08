import React from 'react';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* Text "NETFLIX CLONE" wrapped in Link */}
        <Link to="/" className="logo-text">NETFLIX CLONE</Link>
      </div>
      <div className="search-bar">
        {/* Implement your search bar here */}
        <input type="text" placeholder="Search for movies..." />
        <button>Search</button>
      </div>
    </header>
  );
}

export default Header;