"use client"

import { useBreakpointValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export function UseBreakpoint({children}: {children: ReactNode}){
    const showLink = useBreakpointValue({ base: true, md: false })
    return(showLink && children)
}
