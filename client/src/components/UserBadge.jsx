import { Badge } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'
const UserBadge = ({ user, onClickHandleFunction }) => {
    return (
        <Badge colorScheme='purple' m={1} p={2} display={'flex'} alignItems="center"
            justifyContent={'center'} gap={2}>
            <div>{user.name}</div>
            <CloseIcon cursor={'pointer'} onClick={onClickHandleFunction} />
        </Badge>
    )
}

export default UserBadge