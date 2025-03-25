"use client"

import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApi } from "@/services/api";
import toast from "react-hot-toast";

interface UserProps{
    id: string;
    name: string;
    email: string;
    address?: string;
    subscription?: {
        status: string;
    };
}

export function ProfileForm({ user }: { user: UserProps }){
    const router = useRouter();
    const [name, setName] = useState(user.name)
    const [address, setAddress] = useState(user.address ?? "")

    async function handleLogout(){
        try{
            Cookies.remove("beauty-token");
            router.replace("/login");
        } catch(err){
            console.log("Erro ao deslogar", err)
        }
    }

    const premium = user.subscription?.status === "active"
    
    async function handleUpdate(){
        if(!name){
            toast.error("O campo nome é obrigatório")
            return;
        };

        try{
            const response = await clientApi.put("/user", {
                name,
                address
            })

            toast.success("Dados da conta atualizados!")
            
        } catch(err){
            toast.error("Houve um erro ao atualizar sua conta")
            console.log(err)
        }
    }

    return(
        <>
            <Box my={3}>
                <Text>Nome do Salão</Text>
                <Input 
                    type='text'
                    placeholder='Nome do seu salão de beleza'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Box>
            <Box mb={3}>
                <Text>Endereço</Text>
                <Input 
                    type='text'
                    placeholder='Rua Exemplo, nº 1'
                    bg="beauty.bgColor"
                    rounded={5}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </Box>

            <Box mb={4}>
                <Text>Plano atual:</Text>
                <Flex px={2} py={1} border="1px solid" borderColor="gray.400" rounded={5} alignItems="center" justifyContent="space-between" wrap="wrap" gap="2">
                    <Text color={premium ? "beauty.golden" : "green.600"} fontWeight="bold">
                        Plano {premium ? "premium" : "grátis"}
                    </Text>
                    <Button 
                        all="unset" 
                        bg="green.600" 
                        color="#fff" 
                        px={3} py={1}
                        rounded={5}
                        transition="0.5s"
                        _hover={{ opacity: 0.8 }}
                    >
                        <Link href="/dashboard/planos">Mudar Plano</Link>
                    </Button>
                </Flex>
            </Box>

            <Button
                onClick={handleUpdate}
                w="100%"
                mb={4}
                bg="beauty.action"
                _hover={{ opacity: 0.8 }}
            >
                Salvar
            </Button>

            <Button
                onClick={handleLogout}
                w="100%"
                mb={4}
                color="beauty.danger"
                bg="transparent"
                borderWidth={1}
                borderColor="beauty.danger"
                _hover={{ opacity: 0.8 }}
            >
                Sair da conta
            </Button>
        </>
    )
}