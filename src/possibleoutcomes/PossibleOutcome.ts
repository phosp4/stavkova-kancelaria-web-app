export type PossibleOutcome = {
    outcomeId?: number;
    eventId: number;
    resultName: string;
    odds: number;
    statusForOutcomes: "winning" | "loosing" | "upcoming";
}