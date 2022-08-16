import { ViewIcon } from "@chakra-ui/icons";
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const UpdateGroupChatModal = () => {
    // States
    // Complementry
    const { user, fetchAgain, setFetchAgain } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    // Functions
    return (
        <>

            <Button display={{ base: "flex" }} onClick={onOpen} w={'30px'} h={'30px'}>
                <IconButton icon={<ViewIcon />} onClick={onOpen} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Hello
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal