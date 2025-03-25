import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NewAssignmentForm } from "./components/form";
import { FaAngleLeft } from "react-icons/fa";
import { serverApi } from "@/services/serverApi";

export default async function New(){
    const api = await serverApi();
    const status = await api.get("/status");
    const count = await api.get("/assignmentsnumber");

    const numberAssignments = count.data
    const hasSubscription = status.data.subscription?.status === "active" ? true : false

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center">
                <Link href="/dashboard/assignments">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        <Flex gap={1}>
                            <FaAngleLeft />
                            Voltar
                        </Flex>
                    </Button>
                </Link>
                <Heading color="beauty.golden" fontSize="3xl">Novo Serviço</Heading>
            </Flex>

            <Flex bg="beauty.lightPink" justifyContent="center" alignItems="center" direction="column" p={5} rounded={8}>
                <NewAssignmentForm hasSubscription={hasSubscription} count={numberAssignments} />
            </Flex>
        </>
    )
}