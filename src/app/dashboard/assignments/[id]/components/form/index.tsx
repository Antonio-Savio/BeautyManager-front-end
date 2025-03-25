"use client"

import React, { useState } from "react";
import { Box, Button, Text, Input } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { clientApi } from "@/services/api";
import { AssignmentProps } from "../../../page";
import { toast } from "react-hot-toast";
import { SchedulingProps } from "@/app/dashboard/page";
import { AlertModal } from "../AlertModal";

export interface AssignmentData{
    assignment: AssignmentProps & {
        schedulings: SchedulingProps[];
    }
}

export function UpdateAssignmentForm({ assignment }: AssignmentData){
    const [name, setName] = useState(assignment.name);
    const [price, setPrice] = useState(String(assignment.price));
    const router = useRouter();

    async function handleUpdate(assignment_id: string){
        const priceFormat = /^[0-9.,]*$/.test(price)
        let numericPrice

        if(!name || !price){
            toast.error("Preço e nome são obrigatórios!")
            return;
        };

        if(!priceFormat){
            toast.error("O campo de preço aceita apenas números e vírgula. Ex: 9,90")
            return;
        } else{
            numericPrice = Number(price.replace(",", "."))
        }


        try{
            await clientApi.put("/assignment", {
                name,
                price: numericPrice
            }, {
                params: {
                    assignment_id
                }
            })

            toast.success("Serviço atualizado!")
            router.push("/dashboard/assignments");
        } catch(err){
            toast.error("Erro ao atualizar serviço")
            console.log(err);
        }
    }

    async function handleDelete(assignment_id: string){
        try{
            await clientApi.delete("/assignment", {
                params: {
                    assignment_id
                }
            })

            toast.success("Serviço excluído!")
            router.push("/dashboard/assignments");
        } catch(err){
            toast.error("Erro ao excluir serviço")
            console.log(err)
        }
    }

    return(
        <>
            <Box my={3}>
                <Text>Nome do Serviço</Text>
                <Input 
                    type='text'
                    placeholder='Novo nome do serviço'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <Box mb={3}>
                <Text>Preço do Serviço</Text>
                <Input 
                    type='text'
                    placeholder='Novo preço do serviço'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
            </Box>

            <AlertModal assignment={assignment} handleFunction={handleUpdate}>
                <Button
                    w="100%"
                    mb={3}
                    bg="beauty.action"
                    _hover={{ opacity: 0.8 }}
                >
                    Atualizar
                </Button>
            </AlertModal>

            <AlertModal assignment={assignment} handleFunction={handleDelete}>
                <Button
                    w="100%"
                    mb={4}
                    color="beauty.danger"
                    bg="transparent"
                    borderWidth={1}
                    borderColor="beauty.danger"
                    _hover={{ opacity: 0.8 }}
                >
                    Excluir serviço
                </Button>
            </AlertModal>
        </>
    )
}