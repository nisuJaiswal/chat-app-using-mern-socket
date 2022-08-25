import { Avatar, Tooltip } from '@chakra-ui/react'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../ChatLogic/ChatLogic'
import { ChatState } from '../Context/ChatProvider'
const MessageContainer = ({ messages }) => {
    const { user, selectedChat } = ChatState()
    return (
        <ScrollableFeed >
            {
                messages.map((msg, index) => (
                    <div key={msg._id} style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            (isSameSender(messages, msg, index, user._id) ||
                                isLastMessage(messages, index, user._id)) &&
                            (
                                <Tooltip label={msg.sender.name} hasArrow >

                                    <Avatar
                                        name={msg.sender.name}
                                        src={msg.sender.pic}
                                        mr={1}
                                        mt='5px'
                                        cursor='pointer'
                                        size='sm'
                                    />
                                </Tooltip>

                            )
                        }
                        {
                            selectedChat.isGroupChat ?
                                <span style={{
                                    backgroundColor: user._id === msg.sender._id ? '#BEE3F8' : '#B9F5D0',
                                    borderRadius: '13px',
                                    padding: '5px 16px',
                                    maxWidth: '66%',
                                    marginLeft: isSameSenderMargin(messages, msg, index, user._id),
                                    marginTop: isSameUser(messages, msg, index) ? 3 : 10,
                                    display: 'flex',
                                    flexDirection: 'column'

                                }}

                                >
                                    {msg.sender.name !== user.name && <b>{msg.sender.name}</b>}
                                    {msg.content}
                                </span> :
                                <span style={{
                                    backgroundColor: user._id === msg.sender._id ? '#BEE3F8' : '#B9F5D0',
                                    borderRadius: '13px',
                                    padding: '5px 16px',
                                    maxWidth: '66%',
                                    marginLeft: isSameSenderMargin(messages, msg, index, user._id),
                                    marginTop: isSameUser(messages, msg, index) ? 3 : 10,


                                }}

                                >
                                    {msg.content}
                                </span>
                        }


                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default MessageContainer