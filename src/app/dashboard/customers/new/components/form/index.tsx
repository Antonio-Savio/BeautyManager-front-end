"use client"

import { clientApi } from "@/services/api"
import { Box, Button, Input, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export function NewCustomerForm(){
    const router = useRouter()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")

    async function handleCreateCustomer(){
        const phoneFormat =  /^(?:\(\d{2}\)\s?)?\d{9}$/.test(phone) || /^\d{2}\s\d{9}$/.test(phone) || /^\d{11}$/.test(phone);
        if (!name || !phone){
            toast.error("Campos de nome e telefone são obrigatórios!")
            return;
        }

        if(!phoneFormat){
            toast.error("O telefone deve estar no formato (XX) 999999999");
            return;
        }

        try{
            await clientApi.post("/customer", {
                name,
                phone
            })

            toast.success(`Cliente ${name} cadastrado!`);
            router.push("/dashboard/customers");
        } catch(err: any){
            if(err.response.data){
                toast.error(err.response.data.error);
            } else{
                toast.error("Houve um erro inesperado");
            }
        }
    }

    return(
        <>
            <Box my={3} w="100%">
                <Text>Nome do cliente</Text>
                <Input 
                    type='text'
                    placeholder='Ex: Roberta Santos'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <Box mb={3} w="100%">
                <Text>Número do telefone</Text>
                <Input 
                    type='text'
                    placeholder='999999999'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Box>

            <Button
                onClick={handleCreateCustomer}
                w="100%"
                mb={4}
                bg="beauty.action"
                _hover={{ opacity: 0.8 }}
            >
                Cadastrar
            </Button>
        </>
    )
}