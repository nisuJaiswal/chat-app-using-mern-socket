import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { ChatState } from "../Context/ChatProvider"
import SearchedUserSingle from "./SearchedUserSingle"
import UserBadge from "./UserBadge"

const GroupChatModal = ({ children }) => {

    // States
    const [groupName, setGroupName] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchStateChanged, setSearchStateChanged] = useState(false)

    // Complementry
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const { user, chats, setChats } = ChatState()

    // Functions

    const handleSearch = async (search) => {
        setSearchTerm(search)
        setLoading(true)
        if (!search) {
            setLoading(false)
            return
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwtToken}`
            }
        }
        try {
            const { data } = await axios(`/api/user?search=${search}`, config)
            setSearchResults(data)
            setSearchStateChanged(true)
            setLoading(false)

        } catch (err) {
            toast({
                title: 'Something went wrong',
                description: err.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,

            })
            setLoading(false)
        }

    }
    const addToGroupList = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return
        }
        setSelectedUsers((prev) => ([...prev, userToAdd]))

    }
    const removeFromGroupList = (us) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== us._id))
    }
    const handleCreate = async () => {
        if (!groupName || selectedUsers.length <= 0) {
            toast({
                title: "Please fill all fields",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.jwtToken}`
            }
        }

        try {
            const { data } = await axios.post('/api/chat/group', {
                groupName,
                users: JSON.stringify(selectedUsers.map(u => u._id))
            }
                , config)
            setChats([data, ...chats])
            onClose()
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

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: '2xl', md: '3xl' }}>Create Group Chat</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {/* Group Name */}
                        <FormControl my={2} fontSize={'xl'}>
                            <Input placeholder="Group Name" value={groupName} onChange={e => setGroupName(e.target.value)} />
                        </FormControl>

                        {/* Search */}
                        <FormControl my={2} fontSize={'xl'}>
                            <Input placeholder="Search User..." onChange={(e) => handleSearch(e.target.value)} />
                        </FormControl>

                        {/* Selected Users from the List */}
                        {selectedUsers &&
                            <Box display="flex" flexWrap={'wrap'}>
                                {
                                    selectedUsers.map(us => (
                                        <UserBadge key={us._id} user={us} onClickHandleFunction={() => removeFromGroupList(us)} />))
                                }
                            </Box>
                        }


                        {/* Searched User List */}
                        <Box mt={3} >

                            {
                                loading ? (
                                    <Box display={'flex'} mt={6} justifyContent={'center'}>
                                        <Spinner />
                                    </Box>) : (

                                    // searchResults.slice(0, 5).map(us => <SearchedUserSingle key={us._id} user={us} handleOnClickFunction={() => addToGroupList(us)} />)

                                    searchResults.length > 0 ?
                                        (searchResults.slice(0, 5).map(us => {
                                            return (
                                                <SearchedUserSingle key={us._id} user={us} handleOnClickFunction={() => addToGroupList(us)} />
                                            )
                                        })) : (searchStateChanged && "No User Found")
                                )}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreate} >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal