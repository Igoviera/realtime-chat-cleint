import { Box, Container, Img } from '@chakra-ui/react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Register } from '../components/register'
import { Login } from '../components/login'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import { useContext } from 'react'
import { Context } from '../context/context'
import { Loading } from '../components/Loading'

export default function () {
    const { loading }: any = useContext(Context)

    return (
        <>
            <Head>
                <title>Chat-Login</title>
            </Head>
            {loading === true ? (
                <Loading />
            ) : (
                <Box
                    bg={'#F0F2F5'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    h={'100vh'}
                >
                    <Box
                        display={{ md: 'flex', base: 'none' }}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        w={'45%'}
                        h={'100%'}
                        bg={'#29A59D'}
                    >
                        <Img src="banner11111.png" />
                    </Box>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flex={'1'}>
                        <Container maxW={'450px'} ml={2} mr={2} bg={'white'} borderRadius={10}>
                            <Tabs size="md" variant="line">
                                <TabList mt={'1em'}>
                                    <Tab color={'#59C2BE'} w={'50%'}>Login</Tab>
                                    <Tab color={'#59C2BE'} w={'50%'}>Registre-se</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <Login />
                                    </TabPanel>
                                    <TabPanel>
                                        <Register />
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Container>
                    </Box>
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
