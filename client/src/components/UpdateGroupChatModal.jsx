import { ViewIcon } from "@chakra-ui/icons";
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import UserBadge from "./UserBadge"
import axios from 'axios'
import SearchedUserSingle from './SearchedUserSingle'

const UpdateGroupChatModal = () => {
    // States   
    const [renameValue, setRenameValue] = useState('')
    const [renameLoading, setRenameLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)

    // Complementry
    const { user, fetchAgain, setFetchAgain, selectedChat, setSelectedChat } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    // Functions
    const removeUserFromGroup = async (userToRemove) => {
        setLoading(true)
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admin can add or remove users",
                status: 'warning',
                duration: 3000,
                isClosable: true,

            })
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`
                }
            }
            const { data } = await axios.post('/api/chat/removefromgroup', {
                groupId: selectedChat._id,
                userId: userToRemove._id
            }, config)

            userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast({
                title: 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
        }

    }

    const handleRename = async (newName) => {
        setRenameLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwtToken}`,
                "Content-type": 'application/json'
            }
        }

        try {
            const { data } = await axios.post('/api/chat/rename',
                {
                    groupId: selectedChat._id,
                    groupName: newName
                }
                , config)

            setSelectedChat(data)
            setFetchAgain(!fetchAgain)
            setRenameLoading(false)

        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setRenameLoading(false)
        }
    }

    const handleLeaveGroup = () => { }

    const handleSearchUser = async (searchTerm) => {
        setLoading(true)
        if (!searchTerm) {
            setLoading(false)
            return
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.jwtToken}`
            }
        }
        try {

            const { data } = await axios.get(`/api/user?search=${searchTerm}`, config)

            setSearchResults(data)
            setLoading(false)
        }
        catch (err) {
            toast({
                title: "Something went wrong",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
        }
    }

    const addUserToGroup = async (userToAdd) => {
        console.log(userToAdd)
        setLoading(true)
        if (selectedChat.users.find(u => u._id === userToAdd._id)) {
            toast({
                title: "User already in group",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only Admin can add to remove Users",
                status: "warning",
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`,
                }
            }
            const { data } = await axios.post('/api/chat/addtogroup', {
                groupId: selectedChat._id, userId: userToAdd._id
            }, config)

            setSelectedChat(data)
            setLoading(false)
            setFetchAgain(!fetchAgain)
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
        }
    }

    // useEffect(() => {

    //     console.log(selectedChat.users.map(u => u._id))
    // }, [selectedChat])
    return (
        <>

            <span display={{ base: "flex" }} onClick={onOpen} w={'30px'} h={'30px'}>
                <IconButton icon={<ViewIcon />} onClick={onOpen} />
            </span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: '2xl', md: '3xl' }}>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display='flex' flexWrap={'wrap'}>
                            {
                                selectedChat.users.map(us => (
                                    <UserBadge user={us} key={us._id} onClickHandleFunction={() => removeUserFromGroup(us)} />
                                ))
                            }
                        </Box>

                        {/* For Rename Group */}
                        <FormControl display="flex" gap={2} mt={3}>
                            <Input
                                value={renameValue}
                                onChange={e => setRenameValue(e.target.value)}
                                placeholder="Enter New Name For Group"

                            />
                            <Button variant='outline'
                                colorScheme="whatsapp"
                                onClick={e => handleRename(renameValue)}
                                isLoading={renameLoading}
                            >
                                Rename
                            </Button>
                        </FormControl>

                        {/* For Search User */}
                        <FormControl mt={3}>
                            <Input
                                placeholder="Search User Here..."
                                onChange={e => handleSearchUser(e.target.value)}
                            />
                        </FormControl>

                        <Box>
                            {
                                loading ? <Box display='flex' mt={4} justifyContent={'center'}>
                                    <Spinner />
                                </Box> : (searchResults.slice(0, 4).map(us => (
                                    <SearchedUserSingle user={us} handleOnClickFunction={() => addUserToGroup(us)} key={us._id} />
                                )))}
                        </Box>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3}
                            onClick={e => handleLeaveGroup(user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal