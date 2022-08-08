import { Button, FormControl, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const SignUp = () => {

    // States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPass, setConPass] = useState('')
    const [show, setShow] = useState(false)
    const [showConPass, setShowConPass] = useState(false)


    // Functions
    const postDetails = image => {
        console.log(image)
    }

    const onSubmit = e => {
        console.log("Submited")
    }

    return (


        <VStack>

            {/* Name */}
            <FormControl>
                <Input placeholder='Name' variant='outline' value={name} onChange={e => setName(e.target.value)} />
            </FormControl>

            {/* Email */}
            <FormControl>
                <Input placeholder='Email' variant='outline' value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>
            {/* Password */}
            <FormControl>
                <InputGroup>
                    <Input placeholder='Password' variant='outline' onChange={e => setPassword(e.target.value)} type={!show ? 'password' : 'text'} value={password} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Confirm Password */}
            <FormControl>

                <InputGroup>
                    <Input placeholder='Confirm Password' variant='outline' type={!showConPass ? 'password' : 'text'} value={conPass} onChange={e => setConPass(e.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={() => setShowConPass(!showConPass)}>
                            {showConPass ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Image */}
            <InputGroup>
                <Input type='file' accept='image/*' mt='2' p={1} onChange={e => postDetails(e.target.files[0])} />
            </InputGroup>

            {/* Submit */}
            <Button w='100%' variant='outline' colorScheme='blue' fontWeight={500} style={{ marginTop: 14 }} onClick={onSubmit}>Sign Up</Button>
        </VStack>


    )
}

export default SignUp