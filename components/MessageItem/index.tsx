import { Box, Flex, HStack, Text, background } from '@chakra-ui/react'

export function MessageItem({ data, isSentByCurrentUser }: any) {
    return (
        <Flex mb={'10px'}>
            <Box
                display={'flex'}
                flexDirection={'column'}
                p={'3px'}
                boxShadow={'0 1px 1px #ccc'}
                bg={isSentByCurrentUser? 'white' : '#cbf5be'}
                borderRadius={'10px'}
            >
                <Text fontSize={'14px'} mt={'5px'} mr={'40px'} mb={'5px'} ml={'5px'}>
                    {data.message}
                </Text>
                <Text fontSize={'11px'} color={'#999'} mr={'5px'} mt={'-15px'} h={'15px'} textAlign={'right'}>
                    17:00
                </Text>
            </Box>
        </Flex>
    )
}
