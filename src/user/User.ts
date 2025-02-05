export type User = {
    userId?: number;
    username: string;
    password: string;
    email: string;
    balance: number;
    role: "user" | "admin";
}