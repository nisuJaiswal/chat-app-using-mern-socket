import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext()

const ChatProvider = ({ children }) => {

    const [user, setUser] = useState()
    const [selectedChat, setSelectedChat] = useState([])
    const [chat, setChat] = useState()
    const history = useNavigate()

    useEffect(() => {
        const fetchedUser = JSON.parse(localStorage.getItem('Chat App UserDetails'))
        setUser(fetchedUser)
        if (!fetchedUser) history('/')

    }, [history])
    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chat, setChat }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext)
}

export default ChatProvider