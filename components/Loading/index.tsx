import { Box, Spinner } from "@chakra-ui/react";

export function Loading(){
    return(
        <Box h={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Spinner thickness='3px' size='xl' color='#089dc2' />
        </Box>
    )
}