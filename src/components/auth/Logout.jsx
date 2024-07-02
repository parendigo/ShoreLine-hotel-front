import React, {useContext} from 'react';
import {AuthContext} from "./AuthProvider.jsx";
import {Link, useNavigate} from "react-router-dom";

const Logout = () => {
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        auth.handleLogout()
        // window.location.reload()
        navigate("/", {state: {message: "You have logged out"}})
    }

    const isLogged = auth.user !== null

    return isLogged ? (
       <>
           <li>
               <Link className='dropdown-item' to="/profile">
                   Profile
               </Link>
           </li>
           <li>
               <hr className='dropdown-divider' />
           </li>
           <button className='dropdown-item' onClick={handleLogout}>Logout</button>
       </>
    ) : null;
};

export default Logout;