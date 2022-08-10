import { Button, FormControl, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignUp = () => {

    // States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [conPass, setConPass] = useState('')
    const [pic, setPic] = useState('')
    const [show, setShow] = useState(false)
    const [showConPass, setShowConPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)


    // Complementry
    const history = useNavigate()
    const toast = useToast()


    // Functions
    const postDetails = async (image) => {

        setImageLoading(true)
        if (image === 'undefined') {
            toast({
                title: 'Select a profile picture',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "Chat-App")
            data.append("cloud_name", "dexshxzyp")


            fetch("https://api.cloudinary.com/v1_1/dexshxzyp/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                    setImageLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                    setImageLoading(false)
                });

        }

    }

    // Submit Data
    const onSubmit = async (e) => {
        setLoading(true)

        // Check for no empty fields
        if (!name || !email || !password || !conPass) {
            toast({
                title: 'Please Fill all the fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }

        // Checking for email format
        if (!(email.includes('@') && email.includes('.'))) {
            toast({
                title: 'Please enter a valid email',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }

        // Checking for password length
        if (!(password.length >= 8)) {
            toast({
                title: 'Password must be atleast 8 characters long',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }


        if (password !== conPass) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            return
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('/api/user', { name, email, password, pic }, config)

            toast({
                title: 'Sign Up Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            localStorage.setItem('Chat App User Details ', JSON.stringify(data))
            setLoading(false)

            history('/chat')



        } catch (error) {
            toast({
                title: "Error!",
                description: error.response.data.message,
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

            {/* Name */}
            <FormControl>
                <Input placeholder='Name' variant='outline' value={name} onChange={e => setName(e.target.value)} />
            </FormControl>

            {/* Email */}
            <FormControl>
                <Input placeholder='Email' type='email' variant='outline' value={email} onChange={e => setEmail(e.target.value)} />
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
            <Button w='100%' variant='outline' colorScheme='blue' fontWeight={500} style={{ marginTop: 14 }} onClick={onSubmit} isLoading={imageLoading || loading}>Sign Up</Button>
        </VStack>


    )
}

export default SignUp