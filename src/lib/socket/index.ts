import { env } from "@/env";
import { io } from "socket.io-client";

const URL = env.NEXT_PUBLIC_SOCKET_URL;
export const socket = io(URL);
