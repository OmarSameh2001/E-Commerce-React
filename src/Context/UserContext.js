import { createContext, useEffect, useState } from "react";



export const userContext = createContext()

export function UserContextProvider({ children }) {

    let [token,setToken]  = useState(null) 
    let [login,setLogin]  = useState(null) 
    let [isOpen,setOpen] = useState(false)
   useEffect(()=>{
    const tok = localStorage.getItem('userToken')
    if(tok) setToken(tok);
   }, [])
    return (
    <userContext.Provider value={{token,setToken,login,setLogin,isOpen,setOpen}}>
        {children}
    </userContext.Provider>)
}