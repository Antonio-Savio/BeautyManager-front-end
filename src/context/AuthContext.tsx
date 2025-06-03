"use client"

import { useState, createContext, ReactNode, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import Router from "next/router";
import { clientApi } from "@/services/api";

interface AuthContextData{
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

interface UserProps{
    id: string;
    name: string;
    email: string;
    address?: string;
    token: string;
    subscription?: {
        id: string;
        status: string;
    } | null
}

interface SignInProps{
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        Cookies.remove('beauty-token', { path: '/' })
        Router.replace("/login")
    } catch(err){
        console.log(err);
    }
}

export function AuthProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;
    const router = useRouter();
    
    async function signIn({email, password}: SignInProps){
        try{
            const response = await clientApi.post("/session", {
                email,
                password
            })

            const { id, email: userEmail, name, token, subscription, address } = response.data as UserProps;

            Cookies.set('beauty-token', token, {
                path: '/',
                expires: 30
            })

            setUser({
                id,
                email: userEmail,
                name,
                token,
                address,
                subscription
            })

            router.replace("/dashboard");

        } catch(err){
            console.log("Erro ao entrar", err)
        }
     
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);