import { Button, Flex, Heading } from "@chakra-ui/react";
import { UpdateCustomerForm } from "./components/form";
import { serverApi } from "@/services/serverApi";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";

export default async function CustomerUpdate(
    { params }: {
        params: Promise<{id: string}>
    }
){
    const { id } = await params;
    const api = await serverApi();

    const response = await api.get("/customer", {
        params: {
            customer_id: id
        }
    })

    const customer = response.data;
    if(!customer){
        redirect("/dashboard/customers")
    }

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center" wrap="wrap">
                <Link href="/dashboard/customers">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        <Flex gap={1}>
                            <FaAngleLeft />
                            Voltar
                        </Flex>
                    </Button>
                </Link>
                <Heading fontWeight="bold" mb={3} fontSize="3xl">Atualizar Cliente</Heading>
            </Flex>

            <Flex bg="beauty.lightPink" direction="column" p={5} rounded={8}>
                <UpdateCustomerForm customer={customer} />
            </Flex>
        </>
    )
}