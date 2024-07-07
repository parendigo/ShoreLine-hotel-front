import React, {Component, createContext, useState} from 'react';
import jwtDecode from "jwt-decode";

export const AuthContext = createContext({
    user : null,
    handleLogin: (token) => {
    },
    handleLogout: () => {
    },
});

// class Parent extends Component {
//     setValue = (value) => {
//         this.setState({ value });
//     }
//
//     state = {
//         setValue: this.setValue,
//         value: JSON.parse(localStorage.getItem("user"))
//     }
//
//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.value !== prevState.value) {
//             // Whatever storage mechanism you end up deciding to use.
//             localStorage.setItem("parentValueKey", this.state.value)
//         }
//     }
//
//     render() {
//         return (
//             <AuthContext.Provider value={this.state}>
//                 {this.props.children}
//             </AuthContext.Provider>
//         )
//     }
// }

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const handleLogin = (token) => {
        const decodedToken = jwtDecode(token)
        localStorage.setItem("userEmail", decodedToken.sub)
        localStorage.setItem("userRole", decodedToken.roles)
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(decodedToken))
        setUser(decodedToken)
    }

    const handleLogout = () => {
        localStorage.removeItem("userEmail")
        localStorage.removeItem("userRole")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser(null)
    }
    return (<AuthContext.Provider value={{user, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;