import Link from "next/link"
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react"
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
        const [dd, mm, yy] = dateStr.split(" ")[1].split("/");
        return new Date(`${yy}/${mm}/${dd}`).getTime();
    };

    return(
        <>
            <Flex mb={6} gap={5} alignItems="center" wrap="wrap">
                <Heading color="beauty.golden" fontSize="3xl">Agendamentos</Heading>
                <Link href="/dashboard/new">
                    <Button bg="beauty.action" h="fit-content" py={1} _hover={{ bg: "beauty.hover", transition: "0.3s" }}>
                        Novo Agendamento
                    </Button>
                </Link>
            </Flex>

            {schedulings.length === 0 && (
                <Text color="gray.400">Nenhum agendamento cadastrado</Text>
            )}

            {orderedCategories.map(category => (
                groupedSchedulings[category] ? (
                    <Box key={category} mb={5}>
                        <Heading fontSize="lg" fontWeight="bold" mb={3}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Heading>

                        {Object.entries(groupedSchedulings[category])
                        .sort(([a], [b]) => parseDate(a) - parseDate(b))
                        .map(([date, items]) => (
                            <Box key={date} mb={3}>
                                {category === orderedCategories[2] || category === orderedCategories[3] ? (
                                    <Text as="h4" fontSize="md" mb={2}>{date}</Text>
                                ) : null}
                                {items.map(item => (
                                    <Modal key={item.id} item={item}>
                                        <ScheduleCard item={item} />
                                    </Modal>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ) : null
            ))}
        </>
    )
}