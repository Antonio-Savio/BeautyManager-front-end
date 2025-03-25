"use client"

import { Box, Button, CloseButton, Dialog, HStack, Portal, Text } from "@chakra-ui/react"
import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { ScheduleCard } from "../scheduleCard"
import { SchedulingProps } from "../../page"
import { FcBusinesswoman, FcCalendar, FcClock, FcPhone } from "react-icons/fc"
import { FaMoneyBillAlt } from "react-icons/fa"
import { formatPrice } from "@/utils/currency/formatPrice"
import { GiHairStrands } from "react-icons/gi"
import { getDate, getTime } from "@/utils/datetime/getDateTime"
import { clientApi } from "@/services/api"
import toast from "react-hot-toast"


export function Modal({ item, children }: { item: SchedulingProps, children: ReactNode }){
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function handleDeleteSchedule(schedule_id: string){
    try{
      await clientApi.delete("/schedule", {
        params: {
          schedule_id
        }
      })

      toast.success("Agendamento finalizado!")
      router.refresh();
    } catch(err){
      toast.error("Erro ao finalizar agendamento")
      console.log(err);
    }
  }

  return (
    <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
      <Dialog.Trigger asChild>
        <Button unstyled={true} w="100%" cursor="pointer">
            {children}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW={{base: "90vw", sm: "80vw", md: "500px"}} color="#000" bg="beauty.bgColor">
            <Dialog.Header>
              <Dialog.Title>Detalhes</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body fontSize="large" display="flex" flexDirection="column" gap="3">
              <HStack>
                <Box><FcBusinesswoman/></Box>
                {item.customer.name}
              </HStack>
              <HStack>
                <FcCalendar />
                {getDate(item.time)}
              </HStack>
              <HStack>
                <FcClock color="#000" />
                {getTime(item.time)}
              </HStack>
              <HStack>
                <FcPhone />
                {item.customer.phone}
              </HStack>
              <HStack>
                <GiHairStrands />
                {item.assignment.name}
              </HStack>
              <HStack>
                <FaMoneyBillAlt color="#3a3" />
                {formatPrice(item.assignment.price)}
              </HStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={() => handleDeleteSchedule(item.id)} bg="beauty.action" transition="0.3s" color="beauty.bgColor" _hover={{ bg: "beauty.hover" }}>
                Finalizar agendamento
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color="#000" _hover={{ bg: "beauty.hover" }} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
