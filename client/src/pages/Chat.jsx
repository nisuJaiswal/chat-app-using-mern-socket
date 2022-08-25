import { Box } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ChatArea from "../components/ChatArea"
import Chats from "../components/Chats"
import Header from "../components/Header"
import { ChatState } from "../Context/ChatProvider"


const Chat = () => {
    const { user } = ChatState()

    const history = useNavigate()

    const fetchedUser = JSON.parse(localStorage.getItem("Chat App UserDetails"))
    useEffect(() => {
        if (!fetchedUser) {
            console.log("Inside if")
            history('/')
        }
    }, [history, user, fetchedUser])

    return (
        <>
            {user && <div style={{ width: "100%" }}>
                {user && <Header />}
                <Box display="flex" justifyContent="space-between" heigth="91vh">
                    {user && <Chats />}
                    {user && <ChatArea />}
                </Box>
            </div>}
        </>

    )
}

export default Chat