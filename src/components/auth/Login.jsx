import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../utils/ApiFunctions.js";
import {AuthContext} from "./AuthProvider.jsx";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await loginUser(login);
        if (data) {
            const token = data.token
            auth.handleLogin(token)
            navigate("/")
            // window.location.reload();
        } else {
            setErrorMessage("Invalid username or password. Please try again")
        }
        setTimeout(() => {
            setErrorMessage("")
        }, 4000)
    }

    return (
        <div style={{alignItems:'center', justifyContent:'center', alignSelf: 'center', textAlign:'center'}}>
            <section style={{maxWidth:'400px'}} className='container col-6 mt-5 mb-5'>
                {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
                <h2 className='text-center'>Login</h2>
                <div className='justify-content-center'>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3 align-items-center">
                            <label htmlFor='email' className='col-sm-2 col-form-label'>Email</label>
                            <div>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    className='form-control'
                                    value={login.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor='password' className='col-sm-2 col-form-label'>Password</label>
                            <div>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    className='form-control'
                                    value={login.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <button
                                type="submit"
                                className="btn btn-hotel"
                                style={{marginRight: '10px'}}
                            >
                                Login
                            </button>
                            <span style={{marginLeft: '10px'}}>
                        Dont have an account?<Link to='/register'>Register</Link>.
                    </span>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Login;