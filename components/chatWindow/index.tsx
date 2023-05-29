import { Box, Image, Text, Flex, Input, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { BsFillMicFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineSend } from 'react-icons/ai'
import { MdMoreVert, MdOutlineEmojiEmotions } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import EmojiPicker from 'emoji-picker-react'
import { useContext, useEffect, useState, useRef } from 'react'
import { MessageItem } from '../MessageItem'
import { api } from '../../services/api'
import { Context } from '../../context/context'
import { Loading } from '../Loading'

export function ChatWindow({ activeChat, setIsChatList, socket, setActiveChat }: any) {
    const { session, loading, setLoading } = useContext(Context)
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState('')
    const [messages2, setMessages2] = useState<any[]>([])

    const body = useRef<HTMLDivElement>(null)

    const idSender = session?.user.user._id

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            enviarMessage()
        }
    }

    const enviarMessage = async () => {
        const message = {
            sender: idSender,
            recipient: activeChat._id,
            message: text,
            createdAt: new Date()
        }
        await socket.emit('message', message)
        setText('')
    }

    const findAllMessage = async () => {
        setLoading(true)
        try {
            const response = await api.get(`user/${session?.user.user._id}`, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })

            if (response.status === 200) {
                setLoading(false)
                const messages = response.data.messages
                setMessages2(messages)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        findAllMessage()
    }, [])

    useEffect(() => {
        body.current?.scrollTo(0, body.current.scrollHeight)
    }, [messages2])

    useEffect(() => {
        socket.on('message', (message: any) => {
            setMessages2((prevMessages: any) => [...prevMessages, message])
            //findAllMessage()
        })

        return () => socket.off('message')
    }, [])

    const deleteMessages = async () => {
        try {
            await api.delete(`user/messages/${session?.user.user._id}`, {
                headers: { Authorization: `Bearer ${session?.token}` }
            })
            findAllMessage()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEmojiOpen = () => setEmojiOpen(true)
    const handleCloseEmoji = () => setEmojiOpen(false)
    const handleMicClick = () => {}

    return (
        <Flex w={'100vw'} bg={'#F0F2F5'} flexDirection={'column'} h={'100vh'}>
            <Flex
                borderBottom={'1px solid #ccc'}
                h={'60px'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Flex alignItems={'center'}>
                    <Box
                        onClick={() => {
                            setIsChatList(true)
                            setActiveChat(undefined)
                        }}
                        ml={'15px'}
                        cursor={'pointer'}
                    >
                        <AiOutlineArrowLeft size={'20px'} />
                    </Box>
                    <Image
                        ml={'3px'}
                        mr={'15px'}
                        w={'40px'}
                        h={'40px'}
                        borderRadius={'50%'}
                        src={activeChat?.img}
                    />
                    <Text fontSize={'17px'} color={'black'}>
                        {activeChat?.name}
                    </Text>
                </Flex>
                <Flex gap={'15px'} alignItems={'center'} mr={'15px'}>
                    <BiSearch size={25} cursor={'pointer'} />
                    <Menu>
                        <MenuButton>
                            <MdMoreVert size={25} cursor={'pointer'} />
                        </MenuButton>
                        <MenuList _hover={{ bg: '#F0F2F5' }}>
                            <MenuItem onClick={deleteMessages}>Limpar mensagens</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            <Box
                p={3}
                backgroundSize={'cover'}
                overflowY={'auto'}
                bg={'#E5DDD5'}
                flex={'1'}
                id="messages-end"
                ref={body}
                css={{
                    '&::-webkit-scrollbar': {
                        width: '4px'
                    },
                    '&::-webkit-scrollbar-track': {
                        width: '6px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#C4C3BF',
                        borderRadius: '24px'
                    }
                }}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {messages2?.map((item: any, key: number) => {
                            const isSentByCurrentUser = item.sender === idSender

                            return (
                                <Box
                                    display={'flex'}
                                    key={key}
                                    justifyContent={isSentByCurrentUser ? 'flex-end' : 'flex-start'}
                                >
                                    <Flex>
                                        <MessageItem isSentByCurrentUser={isSentByCurrentUser} data={item} />
                                    </Flex>
                                </Box>
                            )
                        })}
                    </>
                )}
            </Box>
            <Box
                style={{ height: emojiOpen === true ? '450px' : '0px' }}
                overflowY={'hidden'}
                transition={'all ease 0.3'}
            >
                <EmojiPicker
                    height={'100%'}
                    width={'100%'}
                    onEmojiClick={({ emoji }) => setText(text + emoji)}
                />
            </Box>
            <Flex alignItems={'center'} h={'62px'}>
                <Box ml={'15px'} mr={'15px'} display={'flex'}>
                    {emojiOpen && (
                        <MdClose onClick={handleCloseEmoji} size={23} color="#919191" cursor={'pointer'} />
                    )}
                    <MdOutlineEmojiEmotions
                        onClick={handleEmojiOpen}
                        size={23}
                        color="#919191"
                        cursor={'pointer'}
                    />
                </Box>
                <Box display={'flex'} flex={'1'}>
                    <Input
                        placeholder="Digite uma menssagem"
                        pl={'15px'}
                        color={'#4a4a4a'}
                        borderRadius={10}
                        h={'40px'}
                        bg={'white'}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </Box>
                <Flex gap={5} ml={'15px'} mr={'15px'} alignItems={'center'}>
                    {text === '' ? (
                        <BsFillMicFill
                            onClick={handleMicClick}
                            cursor={'pointer'}
                            size={22}
                            color="#919191"
                        />
                    ) : (
                        <AiOutlineSend onClick={enviarMessage} cursor={'pointer'} size={22} color="#919191" />
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
