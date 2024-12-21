import React, { Component } from 'react'
import './Navbar.css'
import {
    Link
  } from "react-router-dom";
export class Navbar extends Component {
  render() {
    return (
        <nav className="navbar  navbar-expand-lg navbar-light">
    <Link className="navbar-brand" to="/">NewsWorm</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/World">World Market</Link>
                    <Link className="dropdown-item" to="/Sports">Sports</Link>
                    <Link className="dropdown-item" to="/Entertainment">Entertainment</Link>
                    <Link className="dropdown-item" to="/Tech">Technology</Link>
                </div>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="#">Contact</Link>
            </li>
        </ul>
        
        <form className="form-inline search-form my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
</nav>

    )
  }
}

export default Navbar
