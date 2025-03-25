import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        beauty: {
          pink: { value: '#D39D9D' },
          bgColor: { value: '#FAF5F0' },
          lightPink: { value: '#F3E8E2' },
          golden: { value: '#D4AF37' },
          action: { value: '#B93A64' },
          danger: { value: '#D9534F' },
          hover: { value: '#CF7593' }
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)