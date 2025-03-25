"use client"

import { Table } from "@chakra-ui/react";
import { CustomersProps } from "../../page";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/currency/formatPrice";

interface CustomerData{
    customer: CustomersProps
}

export function TableRow({customer}: CustomerData){
    const router = useRouter();

    return(
        <Table.Row 
            onClick={() => router.push(`/dashboard/customers/${customer.id}`)} 
            bg="beauty.lightPink" 
            cursor="pointer" 
            _hover={{ bg: "beauty.hover", transition: "0.3s" }}
            title="Editar cliente"
        >
            <Table.Cell fontWeight="bold" maxW="300px" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                {customer.name}
            </Table.Cell>
            <Table.Cell textAlign="center">
                {customer.phone}
            </Table.Cell>
            <Table.Cell textAlign="center">
                {customer.schedules_count}
            </Table.Cell>
            <Table.Cell textAlign="end">
                {formatPrice(customer.total_spent)}
            </Table.Cell>
        </Table.Row>
    )
}