import { Box } from "@chakra-ui/react"
import ChatArea from "../components/ChatArea"
import Chats from "../components/Chats"
import Header from "../components/Header"
import { ChatState } from "../Context/ChatProvider"


const Chat = () => {
    const { user } = ChatState()


    return (
        <>
            <div style={{ width: "100%" }}>
                {user && <Header />}
                <Box display="flex" justifyContent="space-between" heigth="91vh">
                    {user && <Chats />}
                    {user && <ChatArea />}
                </Box>
            </div>
        </>

    )
}

export default Chat