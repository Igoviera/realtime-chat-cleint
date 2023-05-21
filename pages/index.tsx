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
    MenuItem
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
import { signOut, useSession } from 'next-auth/react'
import { io } from 'socket.io-client'
import { User } from '../types/user'

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { chatList }: any = useContext(Context)
    const [activeChat, setActiveChat] = useState<User | undefined>(undefined)
    const [socket] = useState(() => io('http://localhost:5000'))

    return (
        <Box bg={'#ededed'} display={'flex'} h={'100vh'}>
            <Box
                w={'35%'}
                maxW={'415px'}
                display={'flex'}
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
                    <Image
                        w={'40px'}
                        h={'40px'}
                        borderRadius={'50%'}
                        cursor={'pointer'}
                        src="https://www.w3schools.com/howto/img_avatar2.png"
                    />
                    <Text>Olá, {session?.user.user.name}</Text>
                    <Flex alignItems={'center'}>
                        <BsChatLeftTextFill color={'#919191'} size={20} cursor={'pointer'} />
                        <Menu>
                            <MenuButton
                                _hover={{ bg: 'none' }}
                                as={Button}
                                rightIcon={<MdMoreVert color={'#919191'} size={25} cursor={'pointer'} />}
                            ></MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => signOut()}>Desconectar</MenuItem>
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
            </Box>
            <Box w={'100%'} display={'flex'}>
                {activeChat?._id !== undefined && <ChatWindow socket={socket} data={activeChat} />}
                {activeChat?._id === undefined && <ChatIntro />}
            </Box>
        </Box>
    )
}

export default Home

// export async function getServerSideProps(context) {
//     const session = await getSession(context)

//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             user: session.user
//         }
//     }
// }
