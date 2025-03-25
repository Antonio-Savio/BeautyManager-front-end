import { Button, Flex, Heading, Table, Text } from "@chakra-ui/react";
import Link from "next/link";
import { serverApi } from "@/services/serverApi";
import { TableRow } from "./components/table-row";

export interface CustomersProps{
    id: string;
    name: string;
    phone: string;
    schedules_count: number;
    total_spent: number;
}

export default async function Customers(){
    const api = await serverApi();
    const responseSubscription = await api.get("/status")
    const sub = responseSubscription.data;
    const hasPermission = sub?.subscription?.status === "active" ? true : false;    

    const responseCustomer = await api.get("/customerlist");
    const customerList: CustomersProps[] = responseCustomer.data;

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center" wrap="wrap">
                <Heading color="beauty.golden" fontSize="3xl">Principais Clientes</Heading>
                <Link href="/dashboard/customers/new">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        Novo Cliente
                    </Button>
                </Link>
            </Flex>
            
            {hasPermission && (
                <Table.ScrollArea borderWidth="1px" borderColor="gray.300" rounded="md" maxH="400px">
                    <Table.Root size="md">
                        <Table.Header>
                            <Table.Row bg="beauty.pink">
                                <Table.ColumnHeader>Clientes</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Telefone</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Agendamentos</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Total Gasto</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {customerList.map((customer) => (
                                <TableRow key={customer.id} customer={customer}/>
                            ))}
                        </Table.Body>
                    </Table.Root>

                </Table.ScrollArea>
            )}

            {customerList.length === 0 && hasPermission && (
                <Text color="gray.400">Nenhum cliente cadastrado</Text>
            )}

            {!hasPermission && (
                <>
                    <Table.ScrollArea borderWidth="1px" borderColor="gray.300" rounded="md" maxH="400px">
                        <Table.Root size="md">
                            <Table.Header>
                                <Table.Row bg="beauty.pink">
                                    <Table.ColumnHeader>Clientes</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Telefone</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center">Agendamentos</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="end">Total Gasto</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body style={{ filter: "blur(4px)", userSelect: "none" }}>
                                <Table.Row bg="beauty.lightPink" cursor="not-allowed" _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                                    <Table.Cell fontWeight="bold">Vânia</Table.Cell>
                                    <Table.Cell textAlign="center">99980044</Table.Cell>
                                    <Table.Cell textAlign="center">5</Table.Cell>
                                    <Table.Cell textAlign="end">R$ 2350,00</Table.Cell>
                                </Table.Row>
                                <Table.Row bg="beauty.lightPink" cursor="not-allowed" _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                                    <Table.Cell fontWeight="bold">Sílvia Santos</Table.Cell>
                                    <Table.Cell textAlign="center">998243031</Table.Cell>
                                    <Table.Cell textAlign="center">3</Table.Cell>
                                    <Table.Cell textAlign="end">R$ 1900,00</Table.Cell>
                                </Table.Row>
                                <Table.Row bg="beauty.lightPink" cursor="not-allowed" _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                                    <Table.Cell fontWeight="bold">Roberta Mônica</Table.Cell>
                                    <Table.Cell textAlign="center">995736002</Table.Cell>
                                    <Table.Cell textAlign="center">1</Table.Cell>
                                    <Table.Cell textAlign="end">R$ 530,00</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table.Root>
                    </Table.ScrollArea>

                    <Flex my={2}>
                        <Text>
                            <Link href="/dashboard/planos" style={{ marginRight: "3px", fontWeight: "bold", color: "#16a34a" }}>
                                <Text as="span" _hover={{  textDecoration: "underline" }}>Seja premium</Text>
                            </Link>
                            e tenha acesso à lista dos seus maiores clientes. 
                        </Text>
                    </Flex>
                </>
            )}
        </>
    )
}