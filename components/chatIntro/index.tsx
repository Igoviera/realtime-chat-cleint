import { Image, Box } from '@chakra-ui/react'

export function ChatIntro() {
    return (
        <Box w={'100%'} display={{md:'flex'}} justifyContent={'center'} h={'100vh'} bg={'#F0F2F5'} alignItems={'center'}>
            <Image
                w={'300px'}
                h={'290px'}
                borderRadius={'50%'}
                src="https://climba.com.br/blog/wp-content/uploads/2018/03/chat-ecommerce.jpg"
            />
        </Box>
    )
}
