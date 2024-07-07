import React, {useContext} from 'react';
import {AuthContext} from "./AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        auth.handleLogout()
        navigate("/")
    }

    const isLogged = auth.user !== null

    return isLogged ? (
       <>
           <Link className='dropdown-item' to="/profile">
                   Profile
           </Link>
           <p className='dropdown-divider' />
           <li>
               <button className='dropdown-item' onClick={handleLogout}>Logout</button>
           </li>
       </>
    ) : null;
};

export default Logout;