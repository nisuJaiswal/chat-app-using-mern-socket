import { ChatState } from "../Context/ChatProvider"
import { Box, Button, Text, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { AddIcon } from "@chakra-ui/icons"
import { useEffect } from "react"
import { getSenderName } from "../ChatLogic/ChatLogic"
import GroupChatModal from "./GroupChatModal"
const Chats = () => {
    // Complementry
    const { user, selectedChat, setSelectedChat, chats, setChats, fetchAgain } = ChatState()
    const toast = useToast()

    // Functions
    const getChats = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`
                }
            }
            const { data } = await axios.get('/api/chat', config)
            setChats(data)
        } catch (err) {
            toast({
                title: 'Something went wrong',
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    // useEffects
    useEffect(() => {
        getChats()
    }, [fetchAgain])

    return (

        // Main Container
        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDirection="column"
            alignItems="center"
            p={2}
            width={{ base: '100%', md: '33%' }}
            bg="white"
            m={2}
            borderRadius="md"
            height="87vh"
        >
            {/* Header */}
            <Box display="flex"
                fontSize={{ base: 'xl', md: '3xl' }}
                justifyContent={'space-between'}
                width='100%'
                p={2}
            >
                My Chats

                {/* Create Group Chat */}
                <GroupChatModal>

                    <Button colorScheme="blue" variant={'outline'} display="flex" alignItems={'center'}>
                        <AddIcon mr={2} /> New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>


            {/* User Lists */}
            <Box width='100%' height='100%' display="flex" flexDirection={'column'} p={2} overflowY="auto">
                <VStack >
                    {chats.length > 0 ? (
                        chats.map(chat => {

                            return (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    p={2}
                                    m={1}
                                    bg={selectedChat?._id === chat?._id ? "blue.500" : "gray.100"}
                                    color={selectedChat?._id === chat?._id ? "white" : "black"}
                                    w={'100%'}
                                    key={chat._id}
                                >

                                    <Text p={2}>{chat.isGroupChat ? (chat.chatName) :
                                        getSenderName(user, chat.users)
                                    }
                                    </Text>
                                </Box>
                            )
                        })
                    ) : (
                        <Text fontSize={'xl'} color={'black'}>

                            No Any Existing Chats
                        </Text>
                    )}
                </VStack>
            </Box>
        </Box>
    )
}

export default Chats