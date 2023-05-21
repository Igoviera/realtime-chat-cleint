import { Box, Image, Text, Button, Flex, Input } from '@chakra-ui/react'
import { BiSearch } from 'react-icons/bi'
import { BsEmojiSmile, BsFillMicFill } from 'react-icons/bs'
import { AiFillExclamationCircle, AiOutlineSend } from 'react-icons/ai'
import { MdMoreVert, MdOutlineEmojiEmotions } from 'react-icons/md'
import { MdClose } from 'react-icons/md'
import EmojiPicker from 'emoji-picker-react'
import { useEffect, useState, useRef } from 'react'
import { MessageItem } from '../MessageItem'
import { io } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import socket from './Socket'
import axios from 'axios'

export function ChatWindow({ data, fetchUsers, socket }: any) {
    const [emojiOpen, setEmojiOpen] = useState(false)
    const [text, setText] = useState('')
    const [messages2, setMessages2] = useState<any[]>([])
    const { data: session } = useSession()
    const idSender = session?.user.user._id

    const enviarMessage = () => {
        const message = {
            sender: idSender,
            recipient: data._id,
            message: text
        }
        socket.emit('message', message)
        setText('')
    }

    const findAllMessage = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/user/${session?.user.user._id}`)
            const messages = response.data
            setMessages2(messages.messages)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        findAllMessage()
    },[])

    useEffect(() => {
        socket.on('message', (message: any) => {
            setMessages2((prevMessages) => [...prevMessages, message])
             findAllMessage()
             scrollToBottom()
        })

        return () => {
            socket.off('message')
        }
    }, [socket])

    const scrollToBottom = () => {
        const messagesEnd = document.getElementById('messages-end');
        if (messagesEnd) {
          messagesEnd.scrollIntoView({ behavior: 'smooth' });
        }
      };

    const handleEmojiOpen = () => {
        setEmojiOpen(true)
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false)
    }

    const handleSendClick = () => {}

    const handleMicClick = () => {}

    return (
        <Flex w={'100%'} flexDirection={'column'} h={'100vh'}>
            <Flex
                borderBottom={'1px solid #ccc'}
                h={'60px'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Flex alignItems={'center'}>
                    <Image
                        ml={'15px'}
                        mr={'15px'}
                        w={'40px'}
                        h={'40px'}
                        borderRadius={'50%'}
                        src={data.img}
                    />
                    <Text fontSize={'17px'} color={'black'}>
                        {data.name}
                    </Text>
                </Flex>
                <Flex gap={'15px'} alignItems={'center'} mr={'15px'}>
                    <BiSearch size={25} cursor={'pointer'} />
                    <MdMoreVert size={25} cursor={'pointer'} />
                </Flex>
            </Flex>

            <Box p={5} backgroundSize={'cover'} overflowY={'auto'} bg={'#E5DDD5'} flex={'1'}  id="messages-end">
                {messages2?.map((item: any, key: number) => {
                    const isSentByCurrentUser = item.sender === idSender
    
                    return (
                        <Flex key={key} justifyContent={isSentByCurrentUser ? 'flex-end' : 'flex-start'}>
                            <MessageItem isSentByCurrentUser={isSentByCurrentUser} data={item} />
                        </Flex>
                    )
                })}
                {/* {data.messages.map((item: any, key: number) => {
                    const isSentByCurrentUser = item.sender === data._id

                    return (
                        <Flex key={key} justifyContent={isSentByCurrentUser ? 'flex-start' : 'flex-end'}>
                            <MessageItem data={item} isSentByCurrentUser={isSentByCurrentUser} />
                        </Flex>
                    )
                })} */}
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
