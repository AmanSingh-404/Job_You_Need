import axios from "axios"

export async function register({username, email, password}) {
    try{
        const response = await axios.post('/api/auth/register', {username, email, password}, {
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
        const response = await axios.post('/api/auth/login', {email, password}, {
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
        const response = await axios.get("/api/auth/logout", {
            withCredentials: true
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
        const response = await axios.get("/api/auth/me", {
            withCredentials: true
        })
        return response.data
    }
    catch(err) {
        console.log(err)
        throw err
    }
}