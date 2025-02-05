import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Ticket } from "./Ticket";
import { ButtonGroup, Stack, TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function TicketEdit() {
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState<Ticket>({
        ticketId: undefined,
        userId: 0,
        outcomeId: 0,
        status: "pending",
        stake: 0,
        resultName: "",
        eventName: "",
        eventStartTime: new Date()
    });

    const navigate = useNavigate();
    const validateStatus = (status: any): "won" | "lost" | "pending" => {
        return status === "won" || status === "lost" || status === "pending" ? status : "pending";
    };

    useEffect(() => {
        fetch(`http://localhost:8080/tickets/${ticketId}`)
            .then((response) => response.json())
            .then((data) => {
                setTicket({
                    ticketId: data.ticketId,
                    userId: data.userId,
                    outcomeId: data.outcomeId,
                    status: validateStatus(data.status),
                    stake: data.stake,
                    resultName: data.resultName,
                    eventName: data.eventName,
                    eventStartTime: new Date(data.eventStartTime)
                });
            });
    }, [ticketId]);

    function checkIfEmpty(value: string): boolean {
        return value ? value.length > 0 : false;
    }

    function handleSubmit() {
        fetch(`http://localhost:8080/tickets`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        }).then(() => navigate('/tickets'));
    }

    return (
        <Stack>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 6, mb: 4 }}>
                Edit Ticket
            </Typography>
            <TextField fullWidth margin="normal"
                       label={"Stake"}
                       type="number"
                       value={ticket.stake}
                       error={ticket.stake === null || ticket.stake === undefined || isNaN(ticket.stake)}
                       helperText={ticket.stake === null || ticket.stake === undefined || isNaN(ticket.stake) ? "Stake is required" : ""}
                       onChange={(event) =>
                           setTicket({...ticket, stake: parseFloat(event.target.value)} as Ticket)
                       }
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={ticket.status}
                    label="Status"
                    onChange={(event) =>
                        setTicket({ ...ticket, status: event.target.value as "won" | "lost" | "pending" })
                    }
                >
                    <MenuItem value={"won"}>Won</MenuItem>
                    <MenuItem value={"lost"}>Lost</MenuItem>
                    <MenuItem value={"pending"}>Pending</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate('/tickets')}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Box>
        </Stack>
    );
}

export default TicketEdit;