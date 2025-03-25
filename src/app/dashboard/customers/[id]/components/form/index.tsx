"use client"

import React, { useState } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import { CustomersProps } from "../../../page";
import { useRouter } from "next/navigation";
import { clientApi } from "@/services/api";
import { SchedulingProps } from "@/app/dashboard/page";
import { AlertModal } from "../AlertModal";
import toast from "react-hot-toast";

export interface CustomerData{
    customer: CustomersProps & {
        schedulings: SchedulingProps[];
    }
}

export function UpdateCustomerForm({ customer }: CustomerData){
    const [name, setName] = useState(customer.name)
    const [phone, setPhone] = useState(customer.phone)
    const router = useRouter();

    async function handleUpdate(customer_id: string){
        const phoneFormat =  /^(?:\(\d{2}\)\s?)?\d{9}$/.test(phone) || /^\d{2}\s\d{9}$/.test(phone) || /^\d{11}$/.test(phone)
        if(!name || !phone){
            toast.error("Campo nome e telefone são obrigatórios")
            return;
        };

        if(!phoneFormat){
            toast.error("O telefone deve estar no formato (XX) 999999999")
            return;
        }

        try{
            await clientApi.put("/customer", {
                name,
                phone
            }, {
                params: {
                    customer_id
                }
            })

            toast.success("Dados do cliente atualizados!")
            router.push("/dashboard/customers");
        } catch(err){
            toast.error("Erro ao atualizar cliente")
            console.log(err);
        }
    }

    async function handleDelete(customer_id: string){
        try{
            await clientApi.delete("/customer", {
                params: {
                    customer_id
                }
            })

            toast.success("Cliente excluído com sucesso!")
            router.push("/dashboard/customers")
        } catch(err){
            toast.error("Houve um erro ao excluir cliente")
            console.log("Erro ao excluir cliente: ", err)
        }
    }

    return(
        <>
            <Box my={3}>
                <Text>Nome do Cliente</Text>
                <Input 
                    type='text'
                    placeholder='Novo nome do(a) cliente'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <Box mb={3}>
                <Text>Número de telefone</Text>
                <Input 
                    type='text'
                    placeholder='Novo número de telefone'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
            </Box>

            <AlertModal handleFunction={handleUpdate} customer={customer}>
                <Button
                    w="100%"
                    mb={3}
                    bg="beauty.action"
                    _hover={{ opacity: 0.8 }}
                >
                    Atualizar
                </Button>
            </AlertModal>

            <AlertModal handleFunction={handleDelete} customer={customer}>
                <Button
                    w="100%"
                    mb={4}
                    color="beauty.danger"
                    bg="transparent"
                    borderWidth={1}
                    borderColor="beauty.danger"
                    _hover={{ opacity: 0.8 }}
                >
                    Excluir cliente
                </Button>
            </AlertModal>

        </>
    )
}