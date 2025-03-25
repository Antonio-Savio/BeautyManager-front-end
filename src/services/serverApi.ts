import { cookies } from "next/headers"
import { setupAPI } from "./api"

export async function serverApi(){
    const awaitCookie = await cookies();
    const token = awaitCookie.get("beauty-token")?.value;

    return setupAPI(token)
}