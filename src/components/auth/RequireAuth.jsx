import React from "react"
import { Navigate, useLocation } from "react-router-dom"

const RequireAuth = ({children}) => {
    const user = localStorage.getItem("userEmail")
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("userRole")
    const location = useLocation()
    if (!user || !token || !role) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }
    return children
}
export default RequireAuth