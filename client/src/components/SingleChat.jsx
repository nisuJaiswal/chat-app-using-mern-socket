import { ArrowBackIcon } from "@chakra-ui/icons"
import { Box, IconButton, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { getFullUser, getSenderName } from "../ChatLogic/ChatLogic"
import { ChatState } from "../Context/ChatProvider"
import ReUsableModal from './ReUsableModal'
import UpdateGroupChatModal from "./UpdateGroupChatModal"
const SingleChat = () => {
    // States
    // Complementry
    const { selectedChat, user, setSelectedChat } = ChatState()


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
                                    <UpdateGroupChatModal />


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
                            borderRadius={'md'}

                        >

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