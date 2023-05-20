import axios from 'axios'
import { createContext } from 'react'
import { useState, useEffect } from 'react'

interface ContextProps {
    children?: React.ReactNode
}

interface ContextType {}

export const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: ContextProps) => {
    const [chatList, setChatList] = useState([])

    async function fetchUsers() {
        try {
            const response = await axios.get('http://localhost:5000/users')
            setChatList(response.data)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return <Context.Provider value={{chatList}}>{children}</Context.Provider>
}
