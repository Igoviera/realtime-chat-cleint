import type { NextPage } from 'next'
import {
    Box,
    Text,
    Input,
    Button,
    Flex,
    Image,
    InputGroup,
    InputLeftElement,
    MenuButton,
    MenuList,
    Menu,
    MenuItem,
    HStack,
    Select
} from '@chakra-ui/react'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { MdMoreVert } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { ChatList } from '../components/chatListItem'
import { ChatIntro } from '../components/chatIntro'
import { ChatWindow } from '../components/chatWindow'
import { Context } from '../context/context'
import { useContext } from 'react'
import { getSession, signOut, useSession } from 'next-auth/react'
import { io } from 'socket.io-client'
import { User } from '../types/user'
import Head from 'next/head'
import { Loading } from '../components/Loading'

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { chatList, loading }: any = useContext(Context)
    const [socket, setSocket] = useState<any>(null)
    const [activeChat, setActiveChat] = useState<User | undefined>(undefined)
    const [isChatList, setIsChatList] = useState(true)
    const userList = chatList?.filter((item: any) => item._id !== session?.user.user._id)

    const handleChatItemClick = (item: User) => {
        setActiveChat(item)
        setIsChatList(false)
    }

    useEffect(() => {
        const newSocket = io('http://localhost:5000')
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [])

    if (!socket) {
        // Pode renderizar um indicador de carregamento ou retornar null
        return null
    }

    return (
        <>
            <Head>
                <title>Chat</title>
            </Head>
            <Box bg={'blue.700'} display={'flex'} h={'100vh'}>
                {isChatList && (
                    <Box
                        bg={'white'}
                        w={{ md: '35%', base: '100%' }}
                        maxW={{ md: '415px', base: 'none' }}
                        display={{ md: 'flex' }}
                        flexDirection={'column'}
                        borderRight={'1px solid #DDD'}
                    >
                        <Box
                            bg={'#F0F2F5'}
                            pl={'15px'}
                            pr={'15px'}
                            h={'60px'}
                            display={'flex'}
                            justifyContent={'space-between'}
                            alignItems={'center'}
                        >
                            <HStack>
                                <Image
                                    w={'40px'}
                                    h={'40px'}
                                    borderRadius={'50%'}
                                    cursor={'pointer'}
                                    src="https://i.pinimg.com/550x/dc/09/91/dc0991a2ee29b9dff675f4911d32d4d1.jpg"
                                />
                                <Text>Olá, {session?.user.user.name}</Text>
                            </HStack>

                            <Flex gap={5} alignItems={'center'}>
                                <BsChatLeftTextFill color={'#54656F'} size={20} cursor={'pointer'} />
                                <Menu isLazy>
                                    <MenuButton>
                                        <MdMoreVert color={'#54656F'} size={25} cursor={'pointer'} />
                                    </MenuButton>
                                    <MenuList borderRadius={'3px'}>
                                        <MenuItem _hover={{ bg: '#F0F2F5' }} onClick={() => signOut()}>
                                            Desconectar
                                        </MenuItem>
                                        <MenuItem _hover={{ bg: '#F0F2F5' }}>Excluir conta</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Flex>
                        </Box>
                        <Box>
                            <InputGroup w={'90%'} mt={2} ml={5}>
                                <InputLeftElement pointerEvents="none">
                                    <BiSearch size={20} color="#54656F" />
                                </InputLeftElement>
                                <Input
                                    type="search"
                                    borderRadius={10}
                                    borderBottom={'1px solid #EEE'}
                                    bg={'#F0F2F5'}
                                    placeholder="Pesquisar ou começar uma nova conversa"
                                />
                            </InputGroup>
                        </Box>
                        <Box
                            bg={'white'}
                            overflowY={'auto'}
                            css={{
                                '&::-webkit-scrollbar': {
                                    width: '4px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    width: '6px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: '#006611',
                                    borderRadius: '24px'
                                }
                            }}
                        >
                            {userList.map((item: User, key: number) => (
                                <ChatList
                                    socket={socket}
                                    key={key}
                                    onClick={() => handleChatItemClick(item)}
                                    user={item}
                                />
                            ))}
                        </Box>
                    </Box>
                )}
                <Box>
                    {activeChat?._id !== undefined && (
                        <ChatWindow
                            setIsChatList={setIsChatList}
                            setActiveChat={setActiveChat}
                            socket={socket}
                            activeChat={activeChat}
                        />
                    )}
                </Box>

                <Box w={'100%'} display={{ base: 'none', md: 'flex' }}>
                    {activeChat?._id === undefined && <ChatIntro />}
                </Box>
            </Box>
        </>
    )
}

export default Home

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: session.user
        }
    }
}
