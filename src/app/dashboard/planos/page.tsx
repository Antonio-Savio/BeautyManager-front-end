import { serverApi } from "@/services/serverApi";
import { Flex, Heading, List, Button, Box } from "@chakra-ui/react";
import { SubscribeButton } from "./components/subscribeButton";

export default async function Planos(){
    const api = await serverApi();
    const response = await api.get("/status")
    const premium = response.data?.subscription?.status === "active" ? true : false;

    return(
        <>
            <Heading fontWeight="bold" mb={6} fontSize="3xl">Planos</Heading>

            <Flex gap="4" mb="5" w="100%" flexDir={{ base: "column", md: "row" }}>
                <Flex bg="beauty.lightPink" flex="1" direction="column" p={5} rounded={8}>
                    <Heading textAlign="center" mb="3">
                        Plano Grátis
                    </Heading>

                    <List.Root pl="3">
                        <List.Item _marker={{ color: "#000" }}>
                            Agendamento por data e horário.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Cadastrar clientes.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Criar até 5 serviços do salão.
                        </List.Item>
                    </List.Root>
                </Flex>

                <Flex bg="beauty.lightPink" flex="1" direction="column" p={5} rounded={8} boxShadow="0 2px 8px #CF7593" transition="0.3s" _hover={{ boxShadow: "0 4px 15px #CF7593" }}>
                    <Heading textAlign="center" mb="3" fontWeight="bold" color="beauty.golden">
                        Plano Premium
                    </Heading>

                    <List.Root pl="3">
                        <List.Item _marker={{ color: "#000" }}>
                            Agendamento por data e horário.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Cadastrar clientes.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Criar serviços ilimitados.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Tabela de clientes com mais agendamentos realizados e total gasto no seu salão.
                        </List.Item>
                        <List.Item _marker={{ color: "#000" }}>
                            Editar/excluir clientes.
                        </List.Item>
                    </List.Root>

                    <SubscribeButton premium={premium} />
                </Flex>
            </Flex>
        </>
    )
}