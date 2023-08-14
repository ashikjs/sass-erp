import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

import { Link } from '@chakra-ui/react'

import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'

interface Props {
    children: React.ReactNode
}

const Links = [
    {
        name: 'Login',
        link: 'login'
    },
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Product',
        link: 'product'
    },
]

export default function Navigation() {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                        aria-label={'Open Menu'}
                        display={{md: 'none'}}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'right'}>
                        <HStack as={'nav'} spacing={4} display={{base: 'none', md: 'flex'}}>
                            {Links.map((link) => (
                                <Link as={NextLink} href={link.link}>{link.name}</Link>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <Link as={NextLink} href={link.link}>{link.name}</Link>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}
