// eslint-disable-next-line no-unused-vars
import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:9192"
    // baseURL: "http://localhost:8080"

})

export const getHeaders = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

export async function addRoom(photo, roomType, roomPrice) {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);

    const response = await api.post("/rooms/add/new-room", formData, {
        headers :{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
        }
    })
    if (response.status === 201) {
        return true
    } else return false
}


export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data;
    } catch (error) {
        throw new Error("Error fetching room types")
    }
}

export async function getAllRooms() {
    try {
        const response = await api.get("/rooms/all-rooms")
        return response.data;
    } catch (error) {
        throw new Error("Error fetching rooms")
    }
}

export async function deleteRoom(roomId) {
    try {
        const response = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers : getHeaders()
        })
        return response.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`)
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/rooms/update/${roomId}`, formData, {
        headers : getHeaders()
    })
    return response.data
}

export async function getRoomById(roomId) {
    try {
        const response = await api.get(`/rooms/room/${roomId}`)
        return response.data;
    } catch (e) {
        throw new Error(`Error fetching room ${e.message}`)
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/booking/${roomId}`, booking)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room: ${error.message}`)
        }
    }
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers : getHeaders()
        });
        return result.data;
    } catch (e) {
        throw new Error(`Error fetching bookings: ${e.message}`)
    }
}

export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const response = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else
            throw new Error(`Error getting booking by confirmation code: ${error.message}`)
    }
}

export async function cancelBooking(bookingId) {
    try {
        const response = await api.delete(`/bookings/booking/delete/${bookingId}`)
        console.log(response)
        return response.data;
    } catch (e) {
        throw new Error(`Error deleting booking: ${e.message}`)
    }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    try {
        const response = await api.get(
            `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`);
        return response.data;
    } catch (e) {
        throw new Error(`Error getting available room: ${e.message}`)
    }
}

export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data;
    } catch (e) {
        if (e.response && e.response.data) {
            throw new Error(`Error registration: ${e.response.data}`);
        } else {
            throw new Error(`Error registration: ${e.message}`);
        }
    }
}

export async function loginUser(login) {
    try {
        console.log(login)
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else return null
    } catch (e) {
        console.error(e)
        return null;
    }
}

export async function getUserProfile(userEmail, token) {
    try {
        const response = await api.post(`/users/profile/${userEmail}`, {
            headers: getHeaders()
        })
        return response.data;
    } catch (e) {
        console.error(e)
    }
}

export async function deleteUser(userEmail, token) {
    try {
        const response = await api.delete(`/users/delete/${userEmail}`, {
            headers: getHeaders()
        });
        return response.data
    } catch (e) {
        console.error(e)
        return e.message
    }
}

export async function getUserByEmail(userEmail, token) {
    try {
        console.log(userEmail, getHeaders());
        const response = await api.get(`/users/${userEmail}`, {
            headers: getHeaders()
        })
        return response.data;
    } catch (e) {
        console.error(e)
    }
}

export async function getBookingsByUserEmail(userEmail, token) {
    try {
        const response = await api.get(`/bookings/all-bookings/${userEmail}`, {
            headers: getHeaders()
        })
        return response.data;
    } catch (e) {
        console.error(e)
    }
}