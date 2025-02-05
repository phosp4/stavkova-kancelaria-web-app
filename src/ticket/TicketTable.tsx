import React, { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Ticket } from "./Ticket";
import {User} from "../user/User";
import {PossibleOutcome} from "../possibleoutcomes/PossibleOutcome";
import {SportEvent} from "../sportevent/SportEvent";

export function TicketTable() {
    let [tickets, setTickets] = useState<Ticket[]>([]);
    let [users, setUsers] = useState<User[]>([]);
    let [possibleOutcomes, setPossibleOutcomes] = useState<PossibleOutcome[]>([]);
    let [sportEvents, setSportEvents] = useState<SportEvent[]>([]);

    let [error, setError] = useState<Error | undefined>(undefined);

    const navigate = useNavigate();

    const validateTicketStatus = (status: any): "pending" | "won" | "lost" => {
        return status === "pending" || status === "won" || status === "lost" ? status : "pending";
    }

    // fetch tickets
    useEffect(() => {
        fetch("http://localhost:8080/tickets")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: Ticket[] = data.map((ticket: any) => ({
                    ticketId: ticket.ticketId,
                    userId: ticket.userId,
                    outcomeId: ticket.outcomeId,
                    status: validateTicketStatus(ticket.status),
                    stake: ticket.stake,
                    resultName: ticket.resultName,
                    eventName: ticket.eventName,
                    eventStartTime: new Date(ticket.eventStartTime), // Convert eventStartTime string to Date
                }));
                setTickets(formattedData);
            })
            .catch((error) => console.error("Error fetching tickets:", error));
    }, []);

    // fetch users
    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: User[] = data.map((user: any) => ({
                    userId: user.userId,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    balance: user.balance,
                    role: user.role,
                }));
                setUsers(formattedData);
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // fetch outcomes
    useEffect(() => {
        fetch("http://localhost:8080/possibleoutcomes")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: PossibleOutcome[] = data.map((outcome: any) => ({
                    outcomeId: outcome.outcomeId,
                    eventId: outcome.eventId,
                    resultName: outcome.resultName,
                    odds: outcome.odds,
                    sportEventId: outcome.sportEventId,
                }));
                setPossibleOutcomes(formattedData);
            })
            .catch((error) => console.error("Error fetching outcomes:", error));
    }, []);

    // fetch events
    useEffect(() => {
        fetch("http://localhost:8080/sportevents")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: SportEvent[] = data.map((event: any) => ({
                    eventId: event.eventId,
                    eventName: event.eventName,
                    startTime: new Date(event.startTime), // Convert startTime string to Date
                    sportType: event.sportType,
                    status: event.status as "upcoming" | "finished", // Cast to union type
                }));
                setSportEvents(formattedData);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    const handleDeleteClick = (ticketId: number | undefined) => {
        fetch(`http://localhost:8080/tickets/hide/${ticketId}`, {
            method: 'PUT'
        }).then(() => setTickets(tickets.filter(ticket => ticket.ticketId !== ticketId)))
            .catch(error => setError(new Error("Could not delete ticket", { cause: error })));
        if (error) {
            return <div>Error: {error.message}</div>;
        }
    };

    function handleEditClick(ticketId: number | undefined) {
        if (!ticketId) {
            return;
        }
        navigate(`/tickets/edit/${ticketId}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Holder</TableCell>
                        <TableCell>Event</TableCell>
                        <TableCell align="left">Outcome</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Stake</TableCell>
                        <TableCell align="left">{/*edit*/}</TableCell>
                        <TableCell align="left">{/*delete*/}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.map((row) => (
                        <TableRow
                            key={row.ticketId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.ticketId}
                            </TableCell>
                            <TableCell align="left">
                                {users.find(user => user.userId === row.userId)?.username}
                            </TableCell>
                            <TableCell>
                                {(() => {
                                    const outcome = possibleOutcomes.find(possibleOutcome => possibleOutcome.outcomeId === row.outcomeId);
                                    const event = sportEvents.find(sportEvent => sportEvent.eventId === outcome?.eventId);
                                    return event?.eventName;
                                })()}
                            </TableCell>
                            <TableCell align="left">
                                {possibleOutcomes.find(possibleOutcome =>
                                    possibleOutcome.outcomeId === row.outcomeId)?.resultName}
                            </TableCell>
                            <TableCell align="left">{row.status}</TableCell>
                            <TableCell align="left">{row.stake}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditClick(row.ticketId)}>
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDeleteClick(row.ticketId)} color='warning'>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}