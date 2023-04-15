import { Timestamp } from "firebase/firestore";

export interface Contact {
    DateTime: string;
    LatestMessage: string;
    ContactId: number;
    Name: string;
    PngPath: string;
}