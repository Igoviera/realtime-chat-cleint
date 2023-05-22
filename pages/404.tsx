import { Box, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
    return (
        <Box h={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Box>
                <Head>
                    <title>404 | Not Found</title>
                </Head>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Heading>404</Heading>
                    <Box p={3} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Text fontSize={{ base: '14px', md: '18px' }}>
                            Oops, não conseguimos encontrar essa página!
                        </Text>
                        <Text fontSize={{ base: '14px', md: '18px' }}>
                            Clique no Link abaixo para ser redirecionado à Página Inicial
                        </Text>
                    </Box>
                    <Link href={'/'}>Ir para a Págia Inicial</Link>
                </Box>
            </Box>
        </Box>
    )
}
