import React from 'react'
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Chess Analysis</h2>
            <Link to="/">Home</Link>
            <Link to="/analysis">Analysis</Link>
        </div>
    )
}

export default Navbar
