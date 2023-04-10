import React from "react"
import { NavLink } from "react-router-dom"

const linkStyles = {
    display: "inline-block",
    width: "15vh",
    padding: "12px",
    margin: "0 6px 6px",
    background: "beige",
    textDecoration: "none",
    color: "black",
}
  
function NavBar() {
    return (
      <div>
        <NavLink
          to="/"
          exact
          style={linkStyles}
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          exact
          style={linkStyles}
        >
          Create
        </NavLink>
      </div>
    )
}

export default NavBar