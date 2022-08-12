import { ViewIcon } from "@chakra-ui/icons"
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react"

const ReUsableModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {
                children ? (
                    <span onClick={onOpen}>{children}</span>
                ) : (
                    <IconButton aria-label='Search database' icon={<ViewIcon />} />
                )}

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize={{ base: '2xl', md: '3xl' }} textAlign={"center"}>
                        {user.user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection={'column'} alignItems="center" justifyContent={'center'}>


                        <Image src={user.user.pic} boxSize='250px' align={'center'} borderRadius="full" alt={`${user.user.name}'s Image`} mb={2} />

                        <Text fontSize="xl" mt={2}>
                            Email: {user.user.email}
                        </Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >

        </>
    )
}

export default ReUsableModal