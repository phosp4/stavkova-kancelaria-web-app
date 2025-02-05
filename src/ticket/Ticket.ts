export type Ticket = {
    ticketId?: number;
    userId: number;
    outcomeId: number;
    status: "won" | "lost" | "pending";
    stake: number;
    resultName: string;
    eventName: string;
    eventStartTime: Date;
}
