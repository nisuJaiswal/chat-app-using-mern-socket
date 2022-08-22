import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { getFullUser, getSenderName } from "../ChatLogic/ChatLogic"
import { ChatState } from "../Context/ChatProvider"
import ReUsableModal from './ReUsableModal'
import UpdateGroupChatModal from "./UpdateGroupChatModal"
import axios from 'axios'
import { useEffect } from "react"
import MessageContainer from "./MessageContainer"
const SingleChat = () => {
    // States
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    // Complementry
    const { selectedChat, user, setSelectedChat } = ChatState()
    const toast = useToast()

    //Functions
    const sendMessage = async (e) => {
        if (e.key === 'Enter') {
            setNewMessage('')

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.jwtToken}`
                    }
                }

                const { data } = await axios.post('/api/message', {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config)
                setMessages([...messages, data])
            } catch (err) {
                toast({
                    title: "Error",
                    description: err.response.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    }

    const handleType = (e) => {
        setNewMessage(e.target.value)

        // TODO: Typing Indicator using socket.ioS
    }

    const fetchMessages = async () => {
        if (!selectedChat) return

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`
                }

            }
            setLoading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            setMessages(data)
            console.log(data)

            setLoading(false)
        } catch (err) {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }

    }

    useEffect(() => {
        fetchMessages()

    }, [selectedChat])


    return (
        <>
            {
                selectedChat ? (

                    <>
                        <Text
                            display='flex'
                            justifyContent={{ base: 'space-between' }}
                            fontSize={{ base: '2xl', md: '3xl' }}
                            width='100%'
                            mb={2}
                        >


                            <IconButton
                                display={{ base: 'flex', md: 'none' }}
                                icon={<ArrowBackIcon />}
                                onClick={() => setSelectedChat('')}
                            />

                            {selectedChat.isGroupChat ? (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupChatModal fetchMessages={fetchMessages} />


                                </>
                            ) : (
                                <>
                                    {getSenderName(user, selectedChat.users)}
                                    <ReUsableModal user={getFullUser(user, selectedChat?.users)} />
                                </>
                            )}
                        </Text>


                        <Box
                            w='100%'
                            h='100%'
                            bg={'#e8e8e8'}
                            display='flex'
                            flexDirection='column'
                            justifyContent='flex-end'
                            borderRadius={'md'}
                            overflowY='hidden'

                        >
                            {
                                loading ? (
                                    <Spinner size={'xl'} alignSelf={'center'} margin='auto' />
                                ) : (<>
                                    <Box overflowY={'auto'} display='flex' flexDirection={'column'}>
                                        <MessageContainer messages={messages} />
                                    </Box>
                                </>)
                            }
                            <FormControl onKeyDown={sendMessage}>
                                <Input
                                    variant={'filled'}
                                    bg={'#E0E0E0'}
                                    value={newMessage}
                                    onChange={handleType}
                                    placeholder='Type Message Here...'
                                    m={2}
                                    w="98%" />
                            </FormControl>
                        </Box>

                    </>
                ) : (
                    <Box
                        display="flex"
                        alignItems='center'
                        justifyContent='center'
                        h='100%'>

                        <Text fontSize={'2xl'}>
                            Select a Chat to start Chatting
                        </Text>
                    </Box>)
            }</>
    )
}

export default SingleChat