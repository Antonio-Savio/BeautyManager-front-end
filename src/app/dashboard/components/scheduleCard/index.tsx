import { getTime } from "@/utils/datetime/getDateTime";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FcClock } from "react-icons/fc";
import { SchedulingProps } from "../../page";

export function ScheduleCard({ item }: { item: SchedulingProps }){
    return(
        <Flex key={item.id} bg="beauty.lightPink" justifyContent="space-between" direction={{ base: "column", sm: "row"}} mb={3} px={5} py={4} rounded={8} w="100%" transition="0.3s" _hover={{ bg: "beauty.hover" }}>
            <Flex gap={2} alignItems="center" overflow="hidden" minWidth={0} pr={3} flexShrink={0}>
                <Box flexShrink={0}>
                    <FcClock width={16} height={16} />
                </Box>
                <Text>
                    {getTime(item.time)}
                </Text>
            </Flex>
            <Flex overflow="hidden" minWidth={0} flexDirection={{ base: "column", sm: "row"}}>
                <Text fontWeight="bold" pr={3} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" textAlign="left">
                    {item.customer.name}
                </Text>
                <Text pl={{ base: 0, sm: 3 }} borderLeft={{ base: "none", sm: "0.5px solid" }} borderColor="gray.400" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" textAlign="left">
                    {item.assignment.name}
                </Text>
            </Flex>
        </Flex>
    )
}