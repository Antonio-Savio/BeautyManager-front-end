import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loading(){
    return(
        <Flex h={{base: "calc(100vh - 74px - 32px)", md: "calc(100vh - 32px)"}} justifyContent="center" alignItems="center" gap={1} flexDir="column">
            <Spinner 
                color="beauty.pink"
            />
            <Text>Carregando</Text>
        </Flex>
    )
}