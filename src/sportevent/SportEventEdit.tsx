import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SportEvent } from "./SportEvent";
import { ButtonGroup, Stack, TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
dayjs.extend(utc);

function SportEventEdit() {
    const { eventId } = useParams();
    const [sportEvent, setSportEvent] = useState<SportEvent>({
        eventId: undefined,
        eventName: "",
        startTime: new Date(),
        sportType: "",
        status: "upcoming"
    });

    const navigate = useNavigate();
    const validateStatus = (status: any): "upcoming" | "finished" => {
        return status === "upcoming" || status === "finished" ? status : "upcoming";
    };

    useEffect(() => {
        fetch(`http://localhost:8080/sportevents/${eventId}`)
            .then((response) => response.json())
            .then((data) => {
                setSportEvent({
                    eventId: data.eventId,
                    eventName: data.eventName,
                    startTime: new Date(data.startTime),
                    sportType: data.sportType,
                    status: validateStatus(data.status)
                });
            });
    }, [eventId]);

    function checkIfEmpty(eventName: string): boolean {
        return eventName ? eventName.length > 0 : false;
    }

    function handleSumbit() {
        fetch(`http://localhost:8080/sportevents`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sportEvent)
        }).then(() => navigate('/sport-events'));
    }

    return (
        <Stack>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 6, mb: 4 }}>
                Edit Sport Event
            </Typography>
            <TextField fullWidth margin="normal"
                       label={"Event name"}
                       error={!checkIfEmpty(sportEvent.eventName)}
                       helperText={!checkIfEmpty(sportEvent.eventName) ? "Event name is required" : ""}
                       value={sportEvent.eventName}
                       onChange={(event) => setSportEvent({
                           ...sportEvent,
                           eventName: event.target.value
                       } as SportEvent)} />
            <TextField fullWidth margin="normal"
                       label={"Sport type"}
                       error={!checkIfEmpty(sportEvent.sportType)}
                       helperText={!checkIfEmpty(sportEvent.sportType) ? "Start time is required" : ""}
                       value={sportEvent.sportType}
                       onChange={(event) => setSportEvent({
                           ...sportEvent,
                           sportType: event.target.value
                       } as SportEvent)} />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={sportEvent.status}
                    label="Status"
                    onChange={(event) => setSportEvent({
                        ...sportEvent,
                        status: event.target.value as "upcoming" | "finished"
                    })}
                >
                    <MenuItem value={"upcoming"}>Upcoming</MenuItem>
                    <MenuItem value={"finished"}>Finished</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        disabled={!checkIfEmpty(sportEvent.eventName)}
                        color="primary"
                        onClick={handleSumbit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate('/sport-events')}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Box>
        </Stack>
    );
}

export default SportEventEdit;