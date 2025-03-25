"use client"

import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { clientApi } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface NewAssignmentProps{
    hasSubscription: boolean;
    count: number   
}

export function NewAssignmentForm({ hasSubscription, count }: NewAssignmentProps){
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const router = useRouter();

    const hasNotPermission = !hasSubscription && count >= 5

    async function handleCreateAssignment(){
        const priceFormat = /^[0-9.,]*$/.test(price)
        let numericPrice

        if(!name || !price){
            toast.error("Campo nome e preço são obrigatórios")
            return;
        }

        if(!priceFormat){
            toast.error("O campo de preço aceita apenas números e vírgula. Ex: 9,90")
            return;
        } else{
            numericPrice = Number(price.replace(",", "."))
        }

        try{
            await clientApi.post("/assignment", {
                name,
                price: numericPrice
            })

            toast.success(`Serviço de ${name} cadastrado!`)
            router.push("/dashboard/assignments")

        } catch(err){
            toast.error("Houve um erro ao cadastrar serviço. Tente novamente.")
            console.log(err);
        }

    }

    return(
        <>
            <Box my={3} w="100%">
                <Text>Nome do serviço</Text>
                <Input 
                    type='text'
                    placeholder='Ex: Maquiagem completa'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={name}
                    disabled={hasNotPermission}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <Box mb={3} w="100%">
                <Text>Valor do serviço</Text>
                <Input 
                    type='text'
                    placeholder='Ex: 99,90'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={price}
                    disabled={hasNotPermission}
                    onChange={e => setPrice(e.target.value)}
                />
            </Box>

            <Button
                onClick={handleCreateAssignment}
                w="100%"
                mb={4}
                bg="beauty.action"
                disabled={hasNotPermission}
                _hover={{ opacity: 0.8 }}
            >
                Cadastrar
            </Button>

            {hasNotPermission && (
                <Flex mb={3}>
                    <Text color="red.400" textAlign="center">
                        Você atingiu o limite de cadastro de serviços.
                        <Link href="/dashboard/planos" style={{ marginLeft: "3px", fontWeight: "bold", color: "#16a34a" }}>
                            <Text as="span" _hover={{  textDecoration: "underline" }}>Seja premium.</Text>
                        </Link>
                    </Text>
                </Flex>
            )}
        </>
    )
}