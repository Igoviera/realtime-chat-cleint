import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { useSession } from 'next-auth/react'
import { User } from '../types/user'
import { Session } from 'next-auth'
import { io, Socket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface ContextProps {
    children?: React.ReactNode
}

interface ContextType {
    chatList: User[]
    loading: boolean
    setLoading: (value: boolean) => void
    session: Session | null
    socket: Socket | null
}

export const Context = createContext<ContextType>({} as ContextType)

export const ContextProvider = ({ children }: ContextProps) => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState<boolean>(false)
    const [chatList, setChatList] = useState<User[]>([])
    const [socket, setSocket] = useState<Socket | null>(null)

    // Conexão com socket
    useEffect(() => {
        if (session) {
            const newSocket = io('http://localhost:5000')
            newSocket.emit('idUser', session?.user.user._id)    
            setSocket(newSocket)

            return () => {
                newSocket.disconnect()
            }
        }
    }, [session])

    // Buscando usuários
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

    return (
        <Context.Provider value={{ chatList, session, loading, setLoading, socket }}>
            {children}
        </Context.Provider>
    )
}
