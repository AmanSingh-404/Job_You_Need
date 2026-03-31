import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContext = ({ children}) => {
    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(false)

    return {
        <AuthContext.Provider value={{user, setUser, loading, setLoading}} >
            {children}
        <AuthContext.Provider>
    }
}