import React, {useContext, useState} from "react"
import {NavLink, Link} from "react-router-dom"
import Logout from "../auth/Logout.jsx";
import {AuthContext} from "../auth/AuthProvider.jsx";


const NavBar = () => {
    const [showAccount, setShowAccount] = useState(false)

    const handleAccountClick = () => {
        setShowAccount(true)
    }

    const auth = useContext(AuthContext);
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("userRole");

    const isLogged = () => {
        return auth.user !== null;
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <span className="hotel-color">ShoreLine Hotel</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </NavLink>
                        </li>

                        {isLogged() && userRole.includes("ROLE_ADMIN") && (
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <ul className="d-flex navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/find-booking"}>
                                Find my booking
                            </NavLink>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleAccountClick}>
                                {" "}
                                {isLogged() ? (
                                    <>{userEmail}</>
                                ) : (
                                    <>Account</>
                                )}
                            </a>

                            <ul
                                className={`dropdown-menu show`}
                                aria-labelledby="navbarDropdown">

                                {isLogged() ? (
                                    <Logout/>
                                ) : (
                                    <Link className="dropdown-item" to={"/login"}>
                                        Login
                                    </Link>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar