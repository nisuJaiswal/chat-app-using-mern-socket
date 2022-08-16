import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/ChatProvider'
import ReUsableModal from './ReUsableModal'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import SkeletonLoading from './SkeletonLoading'
import SearchedUserSingle from './SearchedUserSingle'
const Header = () => {

    // States
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [afterSearchRes, setAfterSearchRes] = useState(false)
    const [chatLoading, setChatLoading] = useState(false)
    // Complementry
    const { user, setSelectedChat, chats, setChats } = ChatState()
    const history = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    // Functions
    const handleLogOut = () => {
        localStorage.removeItem("Chat App UserDetails")
        history('/')
    }

    const onSearch = async () => {
        if (!searchTerm) {
            toast({
                title: 'Search field is empty, Enter Something',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${searchTerm}`, config)
            setSearchResults(data)
            setLoading(false)
            setAfterSearchRes(true)
        } catch (error) {
            toast({
                title: 'Something went wrong',
                description: error.response.data.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleOnChatClick = async (userId) => {
        setLoading(true)
        setChatLoading(true)
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.jwtToken}`,
                    "Content-Type": 'application/json',
                }
            }
            const { data } = await axios.post(`/api/chat`, { userId }, config)
            if (!chats.find(chat => chat._id === data._id)) {
                setChats([data, ...chats])
            }


            setSelectedChat(data)
            setLoading(false)
            setChatLoading(false)
            onClose()
        } catch (err) {
            toast({
                title: 'Something went wrong',
                description: "Something wrong in data",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setChatLoading(false)
            setLoading(false)
        }
    }

    return (
        <>
            {/* Main Container */}
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                bg={"white"}
                p={3}
            >
                {/* Left Side Search Button */}
                <Tooltip label="Search for Users" hasArrow placement='bottom-end'>
                    <Button onClick={onOpen}>

                        <i className="fa fa-search" aria-hidden="true"></i>
                        <Text p={2} display={{ base: 'none', md: 'flex' }}>
                            Search Users Here
                        </Text>
                    </Button>
                </Tooltip>

                {/* Middle Title */}
                <Text fontSize={{ base: '2xl', md: '3xl' }} color="black">
                    Let's Chat
                </Text>

                {/* Right Side Buttons  */}
                <Box>

                    {/* Notifications */}
                    <Menu>
                        <MenuButton>
                            <BellIcon fontSize={'2xl'} />
                        </MenuButton>
                        {/* <MenuList></MenuList> */}
                    </Menu>

                    {/* Profile */}
                    <Menu >
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={2}>
                            <Avatar size={'sm'} name={user.user.name} src={user.user.pic} />
                        </MenuButton>
                        <MenuList>

                            <ReUsableModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ReUsableModal>

                            <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}

            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Search Users</DrawerHeader>

                    <DrawerBody p={2}>
                        <Box display={'flex'} gap={2} mb={4}>

                            <Input placeholder='Search here...' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                            <Button variant={'ghost'} colorScheme="blue" border={'1px solid blue'} onClick={onSearch} >
                                Search
                            </Button>
                        </Box>
                        {!afterSearchRes && <h4>Search For Users and See Results here</h4>}
                        {

                            loading ? (<SkeletonLoading />) : (
                                searchResults.length > 0 ? (
                                    searchResults.map(user => <SearchedUserSingle
                                        user={user}
                                        key={user._id}
                                        handleOnClickFunction={() => handleOnChatClick(user._id)} />)
                                ) : (afterSearchRes && <h4>No Users Found</h4>)
                            )
                        }

                        {
                            chatLoading && (<Spinner />)
                        }
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>
    )
}



export default Header