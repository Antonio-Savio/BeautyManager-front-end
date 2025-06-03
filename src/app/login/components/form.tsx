"use client"

import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, Center, Input, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Form(){
    const { signIn } = useAuthContext();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(){
        await signIn({email, password})
    }

    return(
        <form aria-label="Formulário de login">
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
                width="100%"
                bgColor="beauty.action"
                mt={6}
                fontWeight="bold"
                color="beauty.bgColor"
                _hover={{ opacity: 0.85 }}
                _active={{ bg: "#CF7593" }}
                transition="0.3s"
                onClick={handleLogin}
            >
                Acessar
            </Button>

            <Center mt={6}>
                <Link href="/signup">
                    <Text cursor="pointer" _hover={{ textDecorationLine: "underline" }}>
                        Não possui uma conta? <strong>Cadastre-se aqui.</strong>
                    </Text>
                </Link>
            </Center>
        </form>
    )
}