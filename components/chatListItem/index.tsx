import { Box, Text, Image, Flex } from '@chakra-ui/react'

export function ChatList({ data, onClick }: any) {
    return (
        <Flex
            onClick={onClick}
            mt={'10px'}
            cursor={'pointer'}
            _hover={{ bg: '#f5f5f5' }}
            alignItems={'center'}
            h={'70px'}
        >
            <Image ml={'15px'} w={'50px'} h={'50px'} borderRadius={'50%'} src={data.img} />
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
                        {data.name}
                    </Text>
                    <Text fontSize={'12px'} color={'#999'}>
                        19:00
                    </Text>
                </Flex>
                <Flex>
                    <Text
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        textOverflow={'ellipsis'}
                        margin={'0'}
                        fontSize={'14px'}
                        color={'#999'}
                    >
                        Opa!kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                        kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                        kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                    </Text>
                </Flex>
            </Box>
        </Flex>
    )
}
