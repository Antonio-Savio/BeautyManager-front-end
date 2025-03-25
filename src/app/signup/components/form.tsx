"use client"

import { useState } from "react";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, Center, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { clientApi } from "@/services/api";
import { useRouter } from "next/navigation";

export function Form(){
    const router = useRouter();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function signUp(){
        if(!name || !email || !password) return;

        try{
            await clientApi.post("/users", {
                name,
                email,
                password
            })

            router.push("/login")

        } catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <Input
                placeholder='Nome do salão de beleza'
                type="text"
                background="beauty.lightPink"
                variant="subtle"
                mb={3}
                value={name}
                onChange={ e => setName(e.target.value) }
            />

            <Input
                placeholder='Digite seu e-mail'
                type="email"
                background="beauty.lightPink"
                variant="subtle"
                mb={3}
                value={email}
                onChange={ e => setEmail(e.target.value) }
            />

            <PasswordInput
                placeholder='Digite sua senha'
                type="password"
                background="beauty.lightPink"
                variant="subtle"
                value={password}
                onChange={ e => setPassword(e.target.value) }
            />

            <Button
                bgColor="beauty.action"
                mt={6}
                fontWeight="bold"
                color="beauty.bgColor"
                _hover={{ opacity: 0.85 }}
                _active={{ bg: "#CF7593" }}
                transition="0.3s"
                onClick={signUp}
            >
                Cadastrar
            </Button>

            <Center mt={6}>
                <Link href="/login">
                    <Text cursor="pointer" _hover={{ textDecorationLine: "underline" }}>
                        Já possui uma conta? <strong>Faça login.</strong>
                    </Text>
                </Link>
            </Center>
        </>
    )
}