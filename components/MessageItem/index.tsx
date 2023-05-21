import { Box, Flex, Text} from '@chakra-ui/react'
import {User} from '../../types/user'

interface MessageItemProps {
    data: User;
    isSentByCurrentUser: boolean
}

export function MessageItem({ data, isSentByCurrentUser }: MessageItemProps) {

    const date = new Date(data.createdAt) 

    const options = {
        
    }
     const dateHoras = date.toLocaleTimeString("pt-br", {hour:'2-digit', minute:'2-digit'})

    return (
        <Flex mb={'10px'}>
            <Box
                display={'flex'}
                flexDirection={'column'}
                p={'3px'}
                boxShadow={'0 1px 1px #ccc'}
                bg={isSentByCurrentUser? '#cbf5be':'white'}
                borderRadius={'10px'}
            >
                <Text fontSize={'14px'} mt={'5px'} mr={'40px'} mb={'5px'} ml={'5px'}>
                    {data.message}
                </Text>
                <Text fontSize={'11px'} color={'#999'} mr={'5px'} mt={'-15px'} h={'15px'} textAlign={'right'}>
                    {dateHoras}
                </Text>
            </Box>
        </Flex>
    )
}
