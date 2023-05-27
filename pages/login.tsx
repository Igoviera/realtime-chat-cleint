import { Box, Container } from '@chakra-ui/react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Register } from '../components/register'
import { Login } from '../components/login'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { Loading } from '../components/Loading'
import { useState } from 'react'

export default function () {
    const [loanding, setLoading] = useState(false)

    return (
        <>
            <Head>
                <title>Chat-Login</title>
            </Head>
            {loanding ? (
                <Loading />
            ) : (
                <Box  bg={'#F0F2F5'} display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100vh'}>
                    <Container maxW={'450px'} ml={2} mr={2} bg={'white'} borderRadius={10}>
                        <Tabs size="md" variant="line">
                            <TabList mt={'1em'}>
                                <Tab w={'50%'}>Login</Tab>
                                <Tab w={'50%'}>Registre-se</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Login setLoading={setLoading} />
                                </TabPanel>
                                <TabPanel>
                                    <Register setLoading={setLoading} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Container>
                </Box>
            )}
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: session
        }
    }
}
