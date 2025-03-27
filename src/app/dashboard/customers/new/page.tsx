import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { NewCustomerForm } from "./components/form";

export default function New(){
    return(
        <>
            <Flex mb={6} gap={5} alignItems="center">
                <Link href="/dashboard/customers">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        <Flex gap={1}>
                            <FaAngleLeft />
                            Voltar
                        </Flex>
                    </Button>
                </Link>
                <Heading fontWeight="bold" fontSize="3xl">Novo Cliente</Heading>
            </Flex>

            <Flex bg="beauty.lightPink" justifyContent="center" alignItems="center" direction="column" p={5} rounded={8}>
                <NewCustomerForm/>
            </Flex>
        </>
    )
}