import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack, Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {useRouter} from "next/router";
import Cookies from 'js-cookie';
import {Link} from '@chakra-ui/react'
import {HamburgerIcon, CloseIcon} from '@chakra-ui/icons'

// @Services
import localStorageService from "src/app/utiles/localStorageService";

const Links = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'Products',
    link: '/products'
  },
  {
    name: 'Products Category',
    link: '/product-categories'
  },
  {
    name: 'Product Request',
    link: '/product-request'
  },
]

export default function Navigation() {
  const {GetItemFromLStorage, RemoveItemFromLStorage} = localStorageService()
  const router = useRouter();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const isLoginUser: boolean = !!GetItemFromLStorage('user')

  const onLogout = () => {
    Cookies.remove('authToken');
    RemoveItemFromLStorage('user');
    router.push('/login');
  }

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
              {
                isLoginUser && Links.map((link) => (
                  <Link as={NextLink} href={link.link} key={link.link}>{link.name}</Link>
                ))
              }
              {
                !isLoginUser && <Link href='/login' key='login'>Login</Link>
              }
              {
                isLoginUser && <Button variant='ghost' onClick={onLogout}>Logout</Button>
              }
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{md: 'none'}}>
            <Stack as={'nav'} spacing={4}>
              {
                isLoginUser && Links.map((link) => (
                  <Link as={NextLink} href={link.link} key={link.link}>{link.name}</Link>
                ))
              }
              {
                !isLoginUser && <Link href='/login' key='login'>Login</Link>
              }
              {
                isLoginUser && <Button variant='ghost' onClick={onLogout}>Logout</Button>
              }
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
