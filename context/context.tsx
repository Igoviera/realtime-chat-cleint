import { createContext } from 'react'
import { useState, useEffect } from 'react'
import {api} from '../services/api'

interface ContextProps {
    children?: React.ReactNode
}

interface ContextType {
    // chatList: any[]
    // onConnect: () => void
    // onDisconnect: () => void
    // onFooEvents: (message: any) => void
}

export const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: ContextProps) => {
    const [chatList, setChatList] = useState([])

    async function fetchUsers() {
        try {
            const response = await api.get('users')
            setChatList(response.data)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return <Context.Provider value={{ chatList }}>{children}</Context.Provider>
}
