import Link from "next/link"
import { Button, Flex, Heading, Text, Box } from "@chakra-ui/react"
import { serverApi } from "@/services/serverApi"
import { formatPrice } from "@/utils/currency/formatPrice"
import { MdLabel } from "react-icons/md";

export interface AssignmentProps{
    id: string;
    name: string;
    price: number;
}

export default async function Assignments(){
    const api = await serverApi()
    const response = await api.get("/assignments");

    const services: AssignmentProps[] = response.data;

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center">
                <Heading color="beauty.golden" fontSize="3xl">Serviços</Heading>
                <Link href="/dashboard/assignments/new">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        Novo Serviço
                    </Button>
                </Link>
            </Flex>
            
            {services.map(service => (
                <Link href={`/dashboard/assignments/${service.id}`} key={service.id} title="Editar serviço">
                    <Flex bg="beauty.lightPink" justifyContent="space-between" mb={3} px={5} py={4} rounded={8} w="100%" cursor="pointer" transition="0.3s" _hover={{ bg: "beauty.hover" }}>
                        <Flex gap={2} alignItems="center" overflow="hidden" minWidth={0} flex="1">
                            <Box flexShrink={0}>
                                <MdLabel
                                    color="#D39D9D"
                                    width={16}
                                    height={16}
                                />
                            </Box>
                            <Text fontWeight="bold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                {service.name}
                            </Text>
                        </Flex>
                        <Text ml={4}>
                            {formatPrice(service.price)}
                        </Text>
                    </Flex>
                </Link>
            ))}

            {services.length === 0 && (
                <Text color="gray.400">Nenhuma categoria criada</Text>
            )}
            
        </>
    )
}