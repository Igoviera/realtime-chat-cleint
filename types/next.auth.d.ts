import 'next-auth/jwt'

import { AuthUser } from './AuthUser'

declare module 'next-auth' {
    interface Session {
        user: AuthUser
        token: string
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        cpf?: string | null
        image?: string | null
        token?: string | null
        role?: string | null
    }
}
