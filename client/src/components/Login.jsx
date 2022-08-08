import { Button, FormControl, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const Login = () => {
    // States
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    return (
        <VStack>

            {/* Name */}
            <FormControl>
                <Input placeholder='Name' value={name} onChange={e => setName(e.target.value)} />
            </FormControl>

            {/* Password */}
            <FormControl>
                <InputGroup>
                    <Input placeholder='Password' type={!show ? 'password' : 'text'} value={password} onChange={e => setPassword(e.target.value)} />
                    <InputRightElement width='4.5rem'>
                        <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            {/* Login Button */}
            <Button w='100%' colorScheme='blue' variant='outline' fontWeight={500} style={{ marginTop: 14 }}>Login</Button>

            {/* Guest User Button */}
            <Button w='100%' colorScheme='red' variant='outline' fontWeight={500} style={{ marginTop: 14 }}
                onClick={() => {
                    setName('guestUser')
                    setPassword('iAmGuest')
                }}
            >Guest User</Button>
        </VStack>
    )
}

export default Login