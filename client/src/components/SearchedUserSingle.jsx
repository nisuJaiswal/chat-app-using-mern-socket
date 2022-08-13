import { Avatar, Box, Text } from "@chakra-ui/react"

const SearchedUserSingle = ({ user, handleOnClickFunction }) => {
    return (
        <Box p={2} display="flex" alignItems="center" gap="14px" _hover={{ bg: 'gray.100', cursor: 'pointer' }} onClick={handleOnClickFunction}>
            <Avatar name={user.name} src={user.pic} size="md" />
            <Box>
                <Text fontSize='lg' fontWeight={'bold'}>{user.name}</Text>
                <Text fontSize={'md'}>{user.email}</Text>

            </Box>
        </Box>
    )
}

export default SearchedUserSingle