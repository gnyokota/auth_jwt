import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav ms-auto d-flex flex-row">
          <li className="nav-item me-3">
            <Link className="nav-link" href="/home">
              Home
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link" href="/register">
              Register
            </Link>
          </li>
          <li className="nav-item me-3">
            <Link className="nav-link" href="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
