import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, FormControl, IconButton, Image, Input, Spinner, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { getFullUser, getSenderName } from "../ChatLogic/ChatLogic"
import { ChatState } from "../Context/ChatProvider"
import ReUsableModal from './ReUsableModal'
import UpdateGroupChatModal from "./UpdateGroupChatModal"
import axios from 'axios'
import { useEffect } from "react"
import io from 'socket.io-client'
import MessageContainer from "./MessageContainer"
import animation from '../animations/typing.json'
import Lottie from 'react-lottie'
import NoSelectedChat from '../selectChat.jpg'

// Lottie animation
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};



// Socket Io Implementation
const END_POINT = 'https://lets-gochat.herokuapp.com/'
var socket, selectedChatCompare

const SingleChat = () => {
    // States
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    // Complementry
    const { selectedChat, user, setSelectedChat, notifications, setNotifications, fetchAgain, setFetchAgain } = ChatState()
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

                socket.emit('new message', data)
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

        if (!socketConnected) return console.log("Socket not connected")
        if (!typing) {
            setTyping(true)
            socket.emit('typing started', selectedChat._id)
        }
        const lastTypeTime = new Date().getTime()
        const timerSeconds = 3000
        setTimeout(() => {
            let currentTime = new Date().getTime()
            let timeDiff = currentTime - lastTypeTime

            if (timeDiff >= timerSeconds && typing) {
                socket.emit('typing stopped', selectedChat._id)
                setTyping(false)
            }
        }, timerSeconds);
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
            setLoading(false)

            socket.emit('join room', selectedChat._id)
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
        selectedChatCompare = selectedChat
    }, [selectedChat])

    // For socket.io
    useEffect(() => {
        socket = io(END_POINT)
        socket.emit('setup', user)
        socket.on('connected', () => setSocketConnected(true))
        socket.on('typing started', () => setIsTyping(true))
        socket.on('typing stopped', () => setIsTyping(false))
    }, [])

    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                // Give Notification
                if (!notifications.includes(newMessageRecieved)) {
                    setNotifications([newMessageRecieved, ...notifications])
                    localStorage.setItem("Chat App Notification", JSON.stringify([newMessageRecieved, ...notifications]))
                    setFetchAgain(!fetchAgain)
                }
            } else {
                setMessages([...messages, newMessageRecieved])
            }
        })
    })

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
                            padding={'0 13px'}

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
                                {isTyping ? <div>
                                    <Lottie
                                        options={defaultOptions}
                                        width={60}
                                        style={{ marginLeft: 10, marginBottom: 2 }}
                                    />
                                </div> : <></>}
                                <Input
                                    variant={'filled'}
                                    bg={'#E0E0E0'}
                                    value={newMessage}
                                    onChange={handleType}
                                    placeholder='Type Message Here...'
                                    width={'99%'}
                                    margin={'7px 0'}
                                />
                            </FormControl>
                        </Box>

                    </>
                ) : (
                    <Box
                        display="flex"
                        alignItems='center'
                        justifyContent='center'
                        h='100%'>

                        <Image src={NoSelectedChat} alt="Select a Chat to start chatting" width={500} height={500} />
                    </Box>)
            }</>
    )
}

export default SingleChat