import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.style.scss'

export const Navbar = () => {
    return (
        <header>
           <Link className="link" to="/">Home</Link>
           <Link className="link" to="/login">Login</Link>
           <Link className="link" to="/register">Register</Link>
           <Link className="link" to="/profile">Profile</Link>
        </header>
    )
}
