import { Timestamp } from "firebase/firestore";

export interface Match {
    DateTime: Timestamp;
    ContactId: number;
    MatchedContactId: number;
    Match: boolean;
}