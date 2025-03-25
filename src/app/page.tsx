import Image from "next/image"
import Link from "next/link"
import { Flex, Heading, Text } from "@chakra-ui/react"
import SalonImg from '../../public/images/salao_de_beleza.png'
import LogoImg from '../../public/images/logo.png'

export default function Demo(){
  return (
    <Flex backgroundColor="beauty.bgColor" minH="100vh" p={3} alignItems="center" flexDir="column">
      <Flex as="nav" justifyContent="flex-end" gap={3} w="100%">
        <Link href="/login">
          <Text transition="0.3s" _hover={{ fontWeight: 'bold' }}>Login</Text>
        </Link>
        <Link href="/signup">
          <Text transition="0.3s" _hover={{ fontWeight: 'bold' }}>Cadastre-se</Text>
        </Link>
      </Flex>

      <Flex as="main" justifyContent="space-evenly" alignItems="center" flex="1" w="100%" flexDir={{ base: "column", md: "row" }}>
        <Flex flexDir="column" gap={5} maxW="50vw" alignItems="center">
          <Image
            src={LogoImg}
            alt="Logo BeautyManager"
            width={250}
            quality={100}
          />
          <Heading fontSize={20} textAlign="center">
            Gerencie seus agendamentos e salve o contato de clientes de forma fácil e intuitiva.
          </Heading>
        </Flex>
        <Image
          src={SalonImg}
          alt="Ilustração BeautyManager"
          width={280}
          quality={100}
        />
      </Flex>
    </Flex>
  )
}