import type { GetServerSideProps, NextPage } from 'next'
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
    HStack
} from '@chakra-ui/react'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { MdMoreVert } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { ChatList } from '../components/chatListItem'
import { ChatIntro } from '../components/chatIntro'
import { ChatWindow } from '../components/chatWindow'
import { Context } from '../context/context'
import { useContext } from 'react'
import { getSession, signOut, useSession } from 'next-auth/react'
import { io } from 'socket.io-client'
import { User } from '../types/user'

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { chatList }: any = useContext(Context)
    const [activeChat, setActiveChat] = useState<User | undefined>(undefined)
    const [socket] = useState(() => io('http://localhost:5000'))

    const [active, setActive] = useState(false)

    const activeC = () => {
        setActive(true)
    }

    return (
        <Box bg={'#ededed'} display={'flex'} h={'100vh'}>
            {/* <Box
                w={{ md: '35%', base: '100%' }}
                maxW={{ md: '415px', base: 'none' }}
                display={{ md: 'flex' }}
                flexDirection={'column'}
                borderRight={'1px solid #DDD'}
            >
                <Box
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
                            src="https://www.w3schools.com/howto/img_avatar2.png"
                        />
                        <Text>Olá, {session?.user.user.name}</Text>
                    </HStack>

                    <Flex alignItems={'center'}>
                        <BsChatLeftTextFill color={'#919191'} size={20} cursor={'pointer'} />
                        <Menu>
                            <MenuButton
                                as={Button}
                                rightIcon={<MdMoreVert color={'#919191'} size={25} cursor={'pointer'} />}
                            ></MenuButton>
                            <MenuList borderRadius={'3px'}>
                                <MenuItem _hover={{ bg: '#ccc' }} onClick={() => signOut()}>
                                    Desconectar
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Box>
                <Box>
                    <InputGroup w={'90%'} mt={2} ml={5}>
                        <InputLeftElement pointerEvents="none">
                            <BiSearch color="#919191" />
                        </InputLeftElement>
                        <Input
                            type="search"
                            borderRadius={10}
                            borderBottom={'1px solid #EEE'}
                            bg={'#F6F6F6'}
                            placeholder="Pesquisar ou começar uma nova conversa"
                        />
                    </InputGroup>
                </Box>
                <Box
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
                    {chatList.map((item: User, key: number) => (
                        <ChatList key={key} onClick={() => setActiveChat(chatList[key])} data={item} />
                    ))}
                </Box>
            </Box> */}
            <ChatWindow socket={socket} data={activeChat} />
            <Box w={'100%'} display={{ base: 'none', md: 'flex' }}>
                {activeChat?._id !== undefined && <ChatWindow socket={socket} data={activeChat} />}
                {activeChat?._id === undefined && <ChatIntro />}
            </Box>
        </Box>
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
