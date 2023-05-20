import { Box, Container } from '@chakra-ui/react'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { Register } from '../components/register'
import { Login } from '../components/login'

export default function () {
    return (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} h={'100vh'}>
            <Container bg={'white'} borderRadius={10}>
                <Tabs size="md" variant="line">
                    <TabList mt={'1em'}>
                        <Tab w={'50%'}>Login</Tab>
                        <Tab w={'50%'}>Registre-se</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Register />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    )
}
