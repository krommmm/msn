import { disconnect } from "../services/auth";


export async function handleLogout() {
    const res = await disconnect();
    return res;
    // remonter etat isConnected
}