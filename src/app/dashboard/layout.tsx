import { Sidebar } from "@/components/sidebar"
import { Flex, Box } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import Logo from '../../../public/images/logo.png'
import { UseBreakpoint } from "@/utils/breakpoint/useBreakpoint"
import { Toaster } from "react-hot-toast"
import { DropdownButton } from "./components/dropdownButton"


export default function DashboardLayout({ children }: {
    children: React.ReactNode
  }) {
    return (
        <Box bg='beauty.bgColor' minH="100vh">
            <Flex direction={{ base: "column", md: "row" }}>
              <Flex>
                <Sidebar/>
                <UseBreakpoint>
                  <Box mt={4} display="inline-block"> {/*Prevent spreading link effect*/}
                    <Link href="/dashboard">
                        <Image
                            src={Logo}
                            alt="Logo BeautyManager"
                            width={140}
                        />
                    </Link>
                  </Box>
                </UseBreakpoint>
              </Flex>

              <Box w="100%" maxW="900px" my={4} px={4} overflow="hidden" marginInline="auto" position="relative">
                {children}

                <DropdownButton/>
              </Box>
            </Flex>

            <Toaster
              position="bottom-right"
              reverseOrder={false}
            />
        </Box>
    )
  }