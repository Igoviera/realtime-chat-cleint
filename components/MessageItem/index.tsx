import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Message } from '../../types/user'

interface MessageItemProps {
    data: Message
    isSentByCurrentUser: boolean
}

export function MessageItem({ data, isSentByCurrentUser }: MessageItemProps) {
    // console.log("🚀 data:", data)
    const date = new Date(data.createdAt)

    // const options = {}
    // const dateHoras = date.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })

    return (
   
            <Box
                display={'flex'}
                mb={'10px'}
                flexDirection={'column'}
                justifyContent={'end'}
                p={'3px'}
                boxShadow={'0 1px 1px #ccc'}
                bg={isSentByCurrentUser ? '#cbf5be' : 'white'}
                borderRadius={'10px'}
            >
                <Text display={'flex'} fontSize={'14px'} mt={'5px'} mr={'40px'} mb={'5px'} ml={'5px'}>
                    {data.message}
                </Text>
                <Text fontSize={'11px'} color={'#999'} mr={'5px'} mt={'-15px'} h={'15px'} textAlign={'right'}>
                    {date.toLocaleTimeString('pt-br', { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </Box>
       
    )
}
