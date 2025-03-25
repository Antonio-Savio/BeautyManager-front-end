"use client"

import { useEffect, useMemo, useState } from "react";
import { clientApi } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Button, createListCollection, Flex, Input, Select, SelectValueText, Text } from "@chakra-ui/react";
import { AssignmentProps } from "@/app/dashboard/assignments/page";
import { CustomersProps } from "@/app/dashboard/customers/page";
import { createDateTime } from "@/utils/datetime/createDateTime";
import toast from "react-hot-toast";

export function NewSchedulingForm(){
    const router = useRouter();
    const [customer, setCustomer] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState<CustomersProps[]>([]);
    const [customerValue, setCustomerValue] = useState<string[]>([])
    const [assignments, setAssignments] = useState<AssignmentProps[]>([]);
    const [assignmentValue, setAssignmentValue] = useState<string[]>([])
    const [assignment_id, setAssignment_id] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState("")
    
    useEffect(() => {
        async function getCustomer(){
            if (customer.length <= 2) {
                return
            };
            
            try{
                const response = await clientApi.get("/customers", {
                    params: {
                        name: customer,
                        phone: customer
                    }
                })
                
                setFilteredCustomers(response.data);
            } catch(err){
                console.log(err)
            }
        }

        getCustomer()
    }, [customer])

    useEffect(() => {
        async function getAssignments(){
            try{
                const response = await clientApi.get("/assignments");
                
                const assignmentList: AssignmentProps[] = response.data;
                
                setAssignments(assignmentList);
            } catch(err){
                console.log("Erro ao buscar serviços ", err)
            }
        }
            
        getAssignments()
    }, [])
    
    
    const customerList = useMemo(() => {
        return createListCollection({
            items: filteredCustomers || [],
            itemToString: (item) => item.id,
            itemToValue: (item) => item.id,
        })
    }, [filteredCustomers])
    
    const assignmentList = useMemo(() => {
        return createListCollection({
            items: assignments || [],
            itemToString: (item) => item.name,
            itemToValue: (item) => item.name,
        })
    }, [assignments])


    async function handleCreateScheduling(){
        const isoDate = createDateTime(date, time);

        if(isoDate === "Invalid date"){
            toast.error("Data inválida")
            return;
        }

        try {
            await clientApi.post("/schedule", {
                time: isoDate,
                customer_id: customerValue[0],
                assignment_id
            })

            toast.success("Agendamento cadastrado!")
            router.push("/dashboard")

        } catch(err){
            toast.error("Houve um erro ao cadastrar o agendamento")
            console.log(err)
        }
    }

    return (
        <>
            <Box my={3} w="100%" position="relative">
                <Text>Nome do cliente ou telefone</Text>
                <Input 
                    type='text'
                    placeholder='Ex: Roberta Santos'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={customer}
                    onChange={e => {
                        setCustomer(e.target.value)
                        if(customerValue.length > 0){
                            setCustomerValue([])
                        }
                    }}
                />
                {filteredCustomers.length > 0 && customer.length > 2 && (
                    <Select.Root 
                        collection={customerList}
                        defaultOpen={true}
                        value={customerValue}
                        onValueChange={(e) => {
                            console.log(e.items)
                            setCustomerValue(e.value)
                            setCustomer(e.items[0].name)
                        }}
                        variant="outline" 
                        bgColor="beauty.bgColor"
                        rounded={5}
                    >
                        
                        <Select.Content>
                            {customerList.items.map((customer) => (
                                <Select.Item item={customer} key={customer.id} flexDirection={{base: "column", md: "row"}} alignItems={{base: "flex-start", md: "center" }}>
                                    <Box>{customer.name}</Box>
                                    <Box color="gray.400">{customer.phone}</Box>
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                )}
                
                {filteredCustomers.length === 0 && customer.length > 2 && (
                    <Flex mt={1}>
                        <Text color="red.400">
                            Cliente não encontrado nesta busca.
                            <Link href="/dashboard/customers/new" style={{ marginLeft: "3px", fontWeight: "bold", color: "#16a34a" }}>
                                <Text as="span" _hover={{  textDecoration: "underline" }}>
                                    Cadastre um novo cliente.
                                </Text>
                            </Link>
                        </Text>
                    </Flex>
                )}
            </Box>
            <Box mb={3} w="100%">
                <Text>Serviço</Text>
                <Select.Root 
                    collection={assignmentList}
                    value={assignmentValue} 
                    onValueChange={(e) => {
                        setAssignmentValue(e.value)
                        setAssignment_id(e.items[0].id)
                    }}
                    variant="outline" 
                    bgColor="beauty.bgColor" 
                    rounded={5}
                >
                    <Select.Trigger>
                        <SelectValueText placeholder="Selecione o serviço" />
                    </Select.Trigger>
                    <Select.Content>
                        {assignmentList.items.map((assign) => (
                            <Select.Item item={assign} key={assign.id}>
                                {assign.name}
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Root>
            </Box>

            <Box mb={3} w="100%">
                <Text>Horário</Text>
                <Input
                    type="time"
                    bg="beauty.bgColor"
                    rounded={5}
                    value={time}
                    onChange={ e => setTime(e.target.value) }
                />
            </Box>

            <Box mb={3} w="100%">
                <Text>Data</Text>
                <Input
                    type="date"
                    bg="beauty.bgColor"
                    rounded={5}
                    value={date}
                    onChange={ e => setDate(e.target.value) }
                />
            </Box>

            <Button
                onClick={handleCreateScheduling}
                w="100%"
                mb={4}
                bg="beauty.action"
                _hover={{ opacity: 0.8 }}
                disabled={!time || !date || !customerValue[0] || !assignment_id}
            >
                Cadastrar
            </Button>
        </>
    )

}
