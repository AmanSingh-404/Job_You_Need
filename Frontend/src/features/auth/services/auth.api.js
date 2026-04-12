import axios from "axios"

const BASE = import.meta.env.VITE_API_URL || ''

export async function register({username, email, password}) {
    try{
        const response = await axios.post(`${BASE}/api/auth/register`, {username, email, password}, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

export async function login({email, password}) {
    try{
        const response = await axios.post(`${BASE}/api/auth/login`, {email, password}, {
            withCredentials: true
        })
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

export async function logout() {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE}/api/auth/logout`, {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        return response.data
    }
    catch(err) {
        console.log(err)
        throw err
    }
}

export async function getMe() {
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${BASE}/api/auth/me`, {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        return response.data
    }
    catch(err) {
        console.log(err)
        throw err
    }
}