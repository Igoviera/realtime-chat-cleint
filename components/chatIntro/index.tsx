import { Box, Image, Text, Flex, Container } from '@chakra-ui/react'

export function ChatIntro() {
    return (
        <Container display={'flex'} justifyContent={'center'} h={'100vh'} alignItems={'center'}>
            <Image
                w={'300px'}
                h={'290px'}
                borderRadius={'50%'}
                src="https://climba.com.br/blog/wp-content/uploads/2018/03/chat-ecommerce.jpg"
            />
        </Container>
    )
}
