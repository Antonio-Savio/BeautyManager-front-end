"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Global } from "@emotion/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { system } from "@/theme/theme"
import { ThemeProvider } from "next-themes"
import { Theme } from "@chakra-ui/react"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <Global
        styles={{
          '::selection': {
            background: '#CF7593',
            color: 'white'
          }
        }}
      />
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Theme appearance="light">
          {props.children}
        </Theme>
      </ThemeProvider>
    </ChakraProvider>
  )
}
