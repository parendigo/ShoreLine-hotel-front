import './App.css'
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AddRoom from "./components/room/AddRoom.jsx";
import ExistingRooms from "./components/room/ExistingRooms.jsx";
import Home from "./components/home/Home.jsx";
import EditRoom from "./components/room/EditRoom.jsx";
import Footer from "./components/layout/Footer.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import RoomListing from "./components/room/RoomListing.jsx";
import Admin from "./components/admin/Admin.jsx";
import CheckOut from "./components/bookings/CheckOut.jsx";
import BookingSuccess from "./components/bookings/BookingSuccess.jsx";
import Bookings from "./components/bookings/Bookings.jsx";
import FindBooking from "./components/bookings/FindBooking.jsx";
import Login from "./components/auth/Login.jsx";
import Registration from "./components/auth/Registration.jsx";
import Profile from "./components/auth/Profile.jsx";
import Logout from "./components/auth/Logout.jsx";
import AuthProvider from "./components/auth/AuthProvider.jsx";
import RequireAuth from "./components/auth/RequireAuth.jsx";
import RequireAuthAdmin from "./components/auth/RequireAuthAdmin.jsx";

function App() {
    return (
        <AuthProvider>
            <main>
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/edit-room/:roomId" element={
                            <RequireAuthAdmin>
                                <EditRoom/>
                            </RequireAuthAdmin>
                        }/>
                        <Route path="/existing-rooms" element={<ExistingRooms/>}/>
                        <Route path="/add-room" element={
                            <RequireAuthAdmin>
                                <AddRoom/>
                            </RequireAuthAdmin>
                        }/>
                        <Route path="/book-room/:roomId" element={<CheckOut/>}/>
                        <Route path="/browse-all-rooms" element={<RoomListing/>}/>
                        <Route path="/admin" element={
                            <RequireAuthAdmin>
                                <Admin/>
                            </RequireAuthAdmin>
                        }/>
                        <Route path="/booking-success" element={<BookingSuccess/>}/>
                        <Route path="/existing-bookings" element={
                            <RequireAuthAdmin>
                                <Bookings/>
                            </RequireAuthAdmin>
                        }/>
                        <Route path="/find-booking" element={<FindBooking/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/profile" element={
                            <RequireAuth>
                                <Profile/>
                            </RequireAuth>
                        }/>
                        <Route path="/logout" element={
                            <RequireAuth>
                                <Logout/>
                            </RequireAuth>
                        }/>
                    </Routes>
                </Router>
                <Footer/>
            </main>
        </AuthProvider>
    )
}

export default App
