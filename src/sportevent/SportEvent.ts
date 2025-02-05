export type SportEvent = {
    eventId?: number;
    eventName: string;
    startTime: Date;
    sportType: string;
    status: "upcoming" | "finished";
}