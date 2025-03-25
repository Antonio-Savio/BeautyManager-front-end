import { Button, Flex, Heading } from '@chakra-ui/react'
import { ProfileForm } from './components/Form'
import { serverApi } from '@/services/serverApi';

export default async function Profile(){
    const api = await serverApi();
    const response = await api.get("/user");
    const user = response.data;

    return(
        <>
            <Heading color="beauty.action" mb={6} fontSize="3xl">Minha conta</Heading>

            <Flex bg="beauty.lightPink" direction="column" p={5} rounded={8}>
                <ProfileForm user={user} />
            </Flex>
        </>
    )
}