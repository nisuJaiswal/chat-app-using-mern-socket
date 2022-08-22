import { Box } from '@chakra-ui/react'
import { ChatState } from '../Context/ChatProvider'
import SingleChat from './SingleChat'

const ChatArea = () => {
    // States
    // Complementry
    const { selectedChat } = ChatState()
    // Functions
    return (
        <>
            <Box
                display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                width={{ base: '100%', md: '66%' }}
                height='87vh'
                bg="white"
                borderRadius={'md'}
                justifyContent='center'
                m={2}
                flexDirection='column'
                p={4}
                overflowY='hidden'

            >
                <SingleChat />
            </Box>
        </>
    )
}

export default ChatArea