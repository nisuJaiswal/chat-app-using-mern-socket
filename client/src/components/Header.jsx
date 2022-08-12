import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../Context/ChatProvider'
const Header = () => {

    // Complementry
    const { user } = ChatState()
    return (
        <>
            {/* Main Container */}
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
                bg={"white"}
                p={1}
            >
                {/* Left Side Search Button */}
                <Tooltip label="Search for Users" hasArrow placement='bottom-end'>
                    <Button>

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
                            <Avatar size={'sm'} name={user.name} src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>My Profile</MenuItem>
                            <MenuItem>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
        </>
    )
}

export default Header