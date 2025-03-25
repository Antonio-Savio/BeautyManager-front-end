"use client"

import { clientApi } from "@/services/api";
import { Box, Button } from "@chakra-ui/react";
import { getStripeJs } from '@/services/stripe-js'

export function SubscribeButton({ premium }: { premium: boolean }){
    async function handleSubscription(){
        if(premium) return;

        try{
            const response = await clientApi.post("/subscribe");

            const { sessionId } = response.data;

            const stripe = await getStripeJs();
            await stripe?.redirectToCheckout({ sessionId });
            
        } catch(err){
            console.log(err);
        }
    }

    async function handleCreatePortal(){
        try{
            if(!premium) return;

            const response = await clientApi.post("/create-portal")

            const { sessionId } = response.data;

            window.location.href = sessionId;
        } catch(err){
            console.log(err)
        }
    }

    return(
        premium ? (
            <>
                <Box mt="3" textAlign="center" fontWeight="bold" color="beauty.hover">Você já é premium!</Box>
                <Button onClick={handleCreatePortal} mt="3" bg="gray.400" transition="0.3s" _hover={{ opacity: 0.8 }}>
                    ALTERAR ASSINATURA
                </Button>
            </>
        ) : (
            <Button onClick={handleSubscription} mt="3" bg="beauty.golden" transition="0.3s" _hover={{ filter: "brightness(1.1)" }}>
                SE TORNE PREMIUM
            </Button>
        )
    )
}