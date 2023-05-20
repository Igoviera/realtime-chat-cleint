import 'next-auth/jwt'

import { AuthUser } from './AuthUser'

declare module 'next-auth' {
    interface Session {
        user: AuthUser
        accessToken: string
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        cpf?: string | null
        image?: string | null
        accessToken?: string | null
        role?: string | null
    }
}
