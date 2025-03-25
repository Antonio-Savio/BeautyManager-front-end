"use client"

import { Box, Button, Flex, Icon, Text, useBreakpointValue } from "@chakra-ui/react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Logo from '../../../public/images/logo.png'
import { IoMenu } from "react-icons/io5";
import { GiHairStrands } from "react-icons/gi"
import { MdOutlineSchedule } from "react-icons/md";
import { IoIosPeople, IoMdSettings, IoMdClose } from "react-icons/io";
import { IconType } from "react-icons"

interface LinksProps{
    name: string;
    icon: IconType;
    route: string;
}

const Links: LinksProps[] = [
    { name: "Agenda", icon: MdOutlineSchedule, route: "/dashboard"},
    { name: "Clientes", icon: IoIosPeople , route: "/dashboard/customers"},
    { name: "Serviços", icon: GiHairStrands, route: "/dashboard/assignments"},
    { name: "Minha Conta", icon: IoMdSettings  , route: "/dashboard/profile"},
]

export const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box mr={open ?  { base: "0", md: "300px"} : "0"} >
        <Box as="button" display={open ? "none" : "block"} onClick={() => setOpen(true)} h="fit-content" mx={3} mt={6} p={1} rounded={4} borderWidth={0.5} borderColor={"gray.300"} cursor="pointer">
            <IoMenu size={30}/>
        </Box>
        <Box w={open ? { base: "full", md: "300px"} : 0} overflow={open ? "auto" : "hidden"} position="fixed" h="full" p={open ? 5 : 0} opacity={open ? 1 : 0} zIndex={open ? 10 : 0} bgColor="beauty.lightPink" borderRightWidth={0.5} borderColor={"gray.300"} transitionDuration="0.5s">
            <Flex justifyContent="space-between" alignItems="flex-start" mt={2} mb={5}>
                <Link href="/dashboard">
                    <Image
                    src={Logo}
                        alt="Logo BeautyManager"
                        width={140}
                    />
                </Link>
                <Button onClick={() => setOpen(false)} all="unset" px={3} py={2} rounded={4} bg="beauty.pink" cursor="pointer" transition="0.3s" _hover={{bg: "beauty.hover"}}>
                    <Icon as={IoMdClose} size="md" />
                </Button>
            </Flex>

            <Flex direction="column">
                {Links.map( link => (
                    <Link href={link.route} key={link.name} onClick={isMobile ? () => setOpen(false) : undefined}>
                        <Flex
                            gap={4}
                            alignItems="center"
                            p={4}
                            borderRadius={10}
                            bg="beauty.pink"
                            transition="0.3s"
                            _hover={{
                                bg: "beauty.hover",
                                fontWeight: "bold"
                            }}
                            mb={2}   
                        >
                            <Icon as={link.icon} size="md" color="#000" />
                            <Text color="#000">{link.name}</Text>
                        </Flex>
                    </Link>
                ))}
            </Flex>
        </Box>
    </Box>
  )
}
