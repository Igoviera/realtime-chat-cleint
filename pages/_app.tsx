import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ContextProvider } from '../context/context'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <SessionProvider>
                <ContextProvider>
                    <Component {...pageProps} />
                </ContextProvider>
            </SessionProvider>
        </ChakraProvider>
    )
}

export default MyApp
