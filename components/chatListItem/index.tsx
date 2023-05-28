import { Box, Text, Flex, Avatar, AvatarBadge, Container, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export function ChatList({ user, onClick, socket }: any) {
    const [notification, setNotification] = useState(0)

    useEffect(() => {
        socket.on('message', (message: any) => {
            setNotification((preNotification) => preNotification + 1)
        })

        return () => socket.off('message')
    }, [])

    return (
        <Flex
            onClick={onClick}
            mt={'10px'}
            cursor={'pointer'}
            _hover={{ bg: '#f5f5f5' }}
            alignItems={'center'}
            h={'70px'}
            mr={'5px'}
        >
            <Avatar ml={'15px'} src={user.img}>
                <AvatarBadge boxSize="0.9em" bg="green.500" />
            </Avatar>

            {/* <Image ml={'15px'} w={'50px'} h={'50px'} borderRadius={'50%'} src={data.img} /> */}
            <Box
                flex={'1'}
                h={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                borderBottom={'1px solid #c4c4c4'}
                pl={'15px'}
                pr={'15px'}
                ml={'15px'}
                minWidth={'0'}
            >
                <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
                    <Text color={'black'} fontSize={'17px'}>
                        {user.name}
                    </Text>

                    <Text fontSize={'12px'} color={'#999'}>
                        19:00
                    </Text>
                </Flex>
                <Flex justifyContent={'end'}>
                    {/* {user.messages.map((item:any) => (
                        <Text
                            bg={'red.100'}
                            key={item._id}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}
                            textOverflow={'ellipsis'}
                            margin={'0'}
                            fontSize={'14px'}
                            color={'#999'}
                        >
                            {item.message}
                        </Text>
                    ))} */}

                    {notification > 0 && (
                        <Center
                            fontSize={'12px'}
                            color={'white'}
                            w={'20px'}
                            h={'20px'}
                            bg={'#25D366'}
                            borderRadius={'50%'}
                        >
                            {notification}
                        </Center>
                    )}
                </Flex>
            </Box>
        </Flex>
    )
}
