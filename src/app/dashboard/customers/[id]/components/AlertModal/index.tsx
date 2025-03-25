import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react"
import { ReactNode, useState } from "react";
import { CustomerData } from "../form";

interface AlertModalProps{
    customer: CustomerData["customer"];
    handleFunction: (customer_id: string) => Promise<void>;
    children: ReactNode
}

export function AlertModal({ customer, handleFunction, children }: AlertModalProps){
    const [open, setOpen] = useState(false);

    return(
        <Dialog.Root 
            lazyMount
            open={open} 
            onOpenChange={(e) => {
                if(customer.schedulings.length === 0){
                    setOpen(false)
                    handleFunction(customer.id)
                } else{
                    setOpen(e.open)
                }
            }} 
            placement="center"
        >
            <Dialog.Trigger asChild>
                {children}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content maxW={{base: "90vw", sm: "80vw", md: "500px"}} color="#000" bg="beauty.bgColor">
                        <Dialog.Header>
                            <Dialog.Title>Deseja prosseguir?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                Ao prosseguir, você <strong>apagará</strong> todos os agendamentos do(a) cliente <strong>{customer.name}</strong> que estão em aberto.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild transition="0.3s" color="#000" _hover={{ opacity: 0.8, bgColor: "beauty.bgColor" }}>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={() => handleFunction(customer.id)} bg="beauty.action" transition="0.3s" color="beauty.bgColor" _hover={{ bg: "beauty.hover" }}>
                                Prosseguir
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild color="#000" _hover={{ bg: "beauty.hover" }}>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}