import Link from "next/link"
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { serverApi } from "@/services/serverApi";
import { CustomersProps } from "./customers/page";
import { AssignmentProps } from "./assignments/page";
import { getDate } from "@/utils/datetime/getDateTime";
import { compareDate } from "@/utils/datetime/compareDate";
import { ScheduleCard } from "./components/scheduleCard";
import { Modal } from "./components/modal";

export interface SchedulingProps{
    id: string;
    finished: boolean;
    time: Date;
    assignment: AssignmentProps;
    customer: CustomersProps;
}

function capitalizeFirstLetter(string: string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default async function Dashboard(){
    const api = await serverApi();
    const response = await api.get("/schedule")
    const schedulings: SchedulingProps[] = response.data;

    const groupedSchedulings = schedulings.reduce((acc, item) => {
        const category = compareDate(item.time); //ex: "hoje"
        acc[category] = acc[category] || {};
        
        const dateKey = getDate(item.time); //ex: "ter. dd/mm/aa"
        acc[category][dateKey] = acc[category][dateKey] || [];
        
        acc[category][dateKey].push(item);
        acc[category][dateKey].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        return acc;
    }, {} as Record<string, Record<string, SchedulingProps[]>>);

    const orderedCategories = ["hoje", "amanhã", "datas futuras", "datas passadas"];
    
    const parseDate = (dateStr: string) => {
        const parts = dateStr.split(" ");
        if (parts.length < 2) return 0;

        const datePart = parts[1];
        const [day, month, year] = datePart.split("/");
        if (!day || !month || !year) return 0;

        return new Date(`20${year}/${month}/${day}`).getTime();
    };

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center" wrap="wrap">
                <Heading fontWeight="bold" fontSize="3xl">Agendamentos</Heading>
                <Link href="/dashboard/new">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        Novo Agendamento
                    </Button>
                </Link>
            </Flex>

            {schedulings.length === 0 && (
                <Text color="gray.400">Nenhum agendamento cadastrado</Text>
            )}

            {orderedCategories.map(category => {
                const categorySchedulings = groupedSchedulings[category];
                if(!categorySchedulings) return null;

                const sortedDatesForCategory = Object.entries(categorySchedulings)
                    .sort(([dateA], [dateB]) => {
                        const isFutureDatesCategory = category === "datas futuras";
                        if (isFutureDatesCategory) {
                            return parseDate(dateA) - parseDate(dateB);
                        } else {
                            return parseDate(dateB) - parseDate(dateA);
                        }
                    })
                
                return (
                    <Box key={category} mb={5}>
                        <Heading fontSize="lg" fontWeight="bold" mb={3}>
                            {capitalizeFirstLetter(category)}
                        </Heading>

                        {sortedDatesForCategory
                        .map(([date, items]) => {
                            const shouldDisplayDateSubHeader = category === "datas futuras" || category === "datas passadas";
                            
                            return (
                                <Box key={date} mb={3}>
                                    {shouldDisplayDateSubHeader && (
                                        <Text as="h4" fontSize="md" mb={2}>
                                            {capitalizeFirstLetter(date)}
                                        </Text>
                                    )}
                                    
                                    {items.map(item => (
                                        <Modal key={item.id} item={item}>
                                            <ScheduleCard item={item} />
                                        </Modal>
                                    ))}
                                </Box>
                            )
                        })}
                    </Box>
                )
            })}
        </>
    )
}