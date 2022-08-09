import { Button, FormControl, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    // States
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)


    // Complementry
    const history = useNavigate()
    const toast = useToast()

    // Functions
    const handleSubmit = async () => {
        setLoading(true)
        if (!email || !password) {
            setLoading(false)
            toast({
                title: 'Please Fill all the fields',
                status: 'warning',
                duration: 6000,
                isClosable: true,
            })
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const { data } = await axios.post('/api/user/login', { email, password }, config)
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 6000,
                isClosable: true,
            })
            localStorage.setItem('Chat App UserDetails', JSON.stringify(data))
            setLoading(false)
            history('/chat')
        } catch (error) {
            toast({
                title: "User doesn't exist",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false)
        }

    }


    return (
        <VStack>

            {/* email */}
            <FormControl>
                <Input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
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
            <Button w='100%' colorScheme='blue' variant='outline' fontWeight={500} style={{ marginTop: 14 }} isLoading={loading} onClick={handleSubmit}>Login</Button>

            {/* Guest User Button */}
            <Button w='100%' colorScheme='red' variant='outline' fontWeight={500} style={{ marginTop: 14 }}
                onClick={() => {
                    setEmail('guestUser')
                    setPassword('iAmGuest')
                }}
            >Guest User</Button>
        </VStack>
    )
}

export default Login