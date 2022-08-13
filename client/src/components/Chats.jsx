import { ChatState } from "../Context/ChatProvider"
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect } from "react"
const Chats = () => {
    // Complementry
    const { user, selectedChat, setSelectedChat, chat, setChat } = ChatState()
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
            console.log(data)
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
    useEffect(() => {
        getChats()
    }, [])

    return (

        <div> </div >
    )
}

export default Chats