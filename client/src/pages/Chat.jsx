import axios from 'axios'
import { useEffect, useState } from 'react'
const Chat = () => {

    // States
    const [chats, setChats] = useState([])
    // Functions 
    const fetchData = async () => {
        const { data } = await axios.get('/api/chats')
        setChats(data)
    }

    // useEffects
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            {
                chats.map((chat) => <div key={chat._id}>{chat.chatName}</div>)
            }
        </div>
    )
}

export default Chat