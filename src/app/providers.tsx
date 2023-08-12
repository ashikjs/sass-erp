'use client'
import React from "react";

import {CacheProvider} from '@chakra-ui/next-js'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme: Record<string, any> = extendTheme({colors})

export function Providers({
                            children
                          }: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}
