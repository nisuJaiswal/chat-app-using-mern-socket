import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
const Home = () => {
    return (
        <Container maxW='xl' centerContent>
            <Box
                display='flex'
                alignItems='center'
                justifyContent="center"
                m={2} p={4}
                bg='white'
                width='100%'
                borderRadius={3}
            >
                <Text fontSize='3xl'>Let's Chat</Text>
            </Box>

            <Box
                display='flex'
                alignItems='center'
                justifyContent="center"
                borderRadius="lg"
                bg='white'
                w='100%'
                p={3}
            >
                <Tabs w='100%' variant='enclosed' size='md'>
                    <TabList m='10px 0'>
                        <Tab w='50%' fontWeight={'600'} >Login</Tab>
                        <Tab w='50%' fontWeight={'600'} >Sign Up</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Login />
                            {/* Login */}
                        </TabPanel>
                        <TabPanel>
                            <SignUp />
                            {/* Sign Up */}
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>
        </Container >
    )
}

export default Home