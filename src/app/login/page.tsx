import Image from 'next/image'
import { Metadata } from 'next';
import Logo from '../../../public/images/logo.png'
import { Center, Flex } from '@chakra-ui/react'
import { Form } from './components/form';

export const metadata: Metadata = {
    title: "BeautyManager - Login",
    description: "Faça seu login para acessar a plataforma BeautyManager e gerenciar seu salão de beleza.",
};

export default function Login(){
    return(
        <Flex background="beauty.bgColor" height="100vh" alignItems="center" justifyContent="center">
            <Flex width={640} direction="column" p={14} rounded={8}>
                <Center p={4}>
                    <Image
                        src={Logo}
                        alt="Logo do BeautyManager"
                        quality={100}
                        width={250}
                    />
                </Center>

                <Form />

            </Flex>
        </Flex>
    )
}