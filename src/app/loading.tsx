import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loading(){
    return(
        <Flex h="100vh" justifyContent="center" alignItems="center" gap={1} flexDir="column">
            <Spinner 
                color="beauty.pink"
            />
            <Text>Carregando</Text>
        </Flex>
    )
}