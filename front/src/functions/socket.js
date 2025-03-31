import { io } from "socket.io-client";
import { HOST } from "../../host";

export const socket = io(HOST, {
    widthCredentials: true,
    autoConnect: false // connexion géré manuellement (quand on est connecté)
});