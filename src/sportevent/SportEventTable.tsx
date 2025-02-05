import {SportEvent} from "./SportEvent";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export function SportEventTable() {

    let [sportEvents, setSportEvents] = useState<SportEvent[]>([]);
    let [error, setError] = useState<Error | undefined>(undefined);

    const navigate = useNavigate();

    // in case status is something else
    const validateStatus = (status: any): "upcoming" | "finished" => {
        return status === "upcoming" || status === "finished" ? status : "upcoming";
    };

    useEffect(() => {
        fetch("http://localhost:8080/sportevents")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: SportEvent[] = data.map((event: any) => ({
                    eventId: event.eventId,
                    eventName: event.eventName,
                    startTime: new Date(event.startTime), // Convert startTime string to Date
                    sportType: event.sportType,
                    status: validateStatus(event.status), // Cast to union type
                }));
                setSportEvents(formattedData);
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    const handleDeleteClick = (userId: number | undefined) => {
        fetch(`http://localhost:8080/sportevents/hide/${userId}`, {
            method: 'PUT'
        }).then(() => setSportEvents(sportEvents.filter(oneEvent => oneEvent.eventId !== userId)))
            .catch(error => setError(new Error("Could not delete sport event", {cause: error})));
        if (error) {
            return <div>Error: {error.message}</div>;
        }
    };

    function handleEditClick(eventId: number | undefined) {
        if (!eventId) {
            return;
        }
        navigate(`/sport-events/edit/${eventId}`);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Sport type</TableCell>
                            <TableCell align="left">Start time</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">{/*edit*/}</TableCell>
                            <TableCell align="left">{/*delete*/}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sportEvents.map((row) => (
                            <TableRow
                                key={row.eventId}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.eventId}
                                </TableCell>
                                <TableCell align="left">{row.eventName}</TableCell>
                                <TableCell align="left">{row.sportType}</TableCell>
                                <TableCell align="left">{row.startTime.toLocaleString()}</TableCell>
                                <TableCell align="left">{row.status}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEditClick(row.eventId)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteClick(row.eventId)} color='warning'>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<IconButton */}
            {/*    color="primary"*/}
            {/*    size="large"*/}
            {/*    onClick={() => navigate('/users/create')}><AddIcon/>*/}
            {/*</IconButton>*/}
        </>
    );
}