import { Button, Menu, Portal } from "@chakra-ui/react"
import Link from "next/link"
import { FaPlus } from "react-icons/fa"

export function DropdownButton(){
    return(
        <Menu.Root positioning={{ placement: "top-end" }}>
                  <Menu.Trigger asChild>
                    <Button
                      size="sm"
                      variant="outline" 
                      bg="beauty.pink" 
                      rounded="full" 
                      w="50px" 
                      h="50px"
                      position="fixed"
                      bottom="0"
                      right="0"
                      margin={4}                  
                    >
                      <FaPlus />
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content bg="beauty.bgColor">
                        {links.map((link) => (
                          <Menu.Item key={link.href} asChild value={link.title} color="#000" _hover={{ bg: "beauty.hover" }}>
                            <Link href={link.href}>
                              {link.title}
                            </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
    )
}

const links = [
    {
        title: "Novo Agendamento",
        href: "/dashboard/new",
    },
    {
        title: "Novo Cliente",
        href: "/dashboard/customers/new",
    },
    {
        title: "Novo Serviço",
        href: "/dashboard/assignments/new",
    },
]