import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useSession } from 'next-auth/react'
import { User } from '../types/user'
import { Session } from 'next-auth'

interface ContextProps {
    children?: React.ReactNode
}

interface ContextType {
    chatList: User[]
    loading: boolean
    setLoading: (value: boolean) => void
    session: Session | null
}

export const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: ContextProps) => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState<boolean>(false)
    const [chatList, setChatList] = useState<User[]>([])

    // Buscando usuarios
    async function fetchUsers() {
        try {
            const response = await api.get<User[]>('users')
            setChatList(response.data)
        } catch (error) {
            console.error('Erro ao buscar usuários:', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return <Context.Provider value={{ chatList, session, loading, setLoading }}>{children}</Context.Provider>
}
