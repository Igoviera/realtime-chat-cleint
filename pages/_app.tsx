import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ContextProvider } from '../context/context'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
    
    return (
        <SessionProvider session={pageProps.session} refetchInterval={60 * 5}>
            <ChakraProvider>
                <ContextProvider>
                    <Component {...pageProps} />
                </ContextProvider>
            </ChakraProvider>
        </SessionProvider>
    )
}

export default MyApp
