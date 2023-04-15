import { Timestamp } from "firebase/firestore";

export interface Message {
    SenderContactId: number,
    ReceiverContactId: number,
    Message: string,
    DateTime: string,
}