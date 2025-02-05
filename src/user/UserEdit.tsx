import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "./User";
import { ButtonGroup, Stack, TextField, Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Ticket} from "../ticket/Ticket";

function UserEdit() {
    const { userId } = useParams();
    const [user, setUser] = useState<User>({
        userId: undefined,
        username: "",
        password: "",
        email: "",
        balance: 0,
        role: "user"
    });

    const navigate = useNavigate();
    const validateRole = (role: any): "admin" | "user" => {
        return role === "admin" || role === "user" ? role : "user";
    };

    useEffect(() => {
        fetch(`http://localhost:8080/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setUser({
                    userId: data.userId,
                    username: data.username,
                    password: data.password,
                    email: data.email,
                    balance: data.balance,
                    role: validateRole(data.role)
                });
            });
    }, [userId]);

    function checkIfEmpty(value: string): boolean {
        return value ? value.length > 0 : false;
    }

    function handleSubmit() {
        fetch(`http://localhost:8080/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() => navigate('/users'));
    }

    return (
        <Stack>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 6, mb: 4 }}>
                Edit User
            </Typography>
            <TextField fullWidth margin="normal"
                       label={"Username"}
                       error={!checkIfEmpty(user.username)}
                       helperText={!checkIfEmpty(user.username) ? "Username is required" : ""}
                       value={user.username}
                       onChange={(event) =>
                           setUser({...user, username: event.target.value} as User)
                       }
            />
            <TextField fullWidth margin="normal"
                       label={"Email"}
                       error={!checkIfEmpty(user.email)}
                       helperText={!checkIfEmpty(user.email) ? "Email is required" : ""}
                       value={user.email}
                       onChange={(event) =>
                           setUser({...user, email: event.target.value} as User)
                       }
            />
            <TextField fullWidth margin="normal"
                       label={"Balance"}
                       type="number"
                       error={user.balance === null || user.balance === undefined || isNaN(user.balance)}
                       helperText={user.balance === null || user.balance === undefined || isNaN(user.balance) ? "Balance is required" : ""}
                       value={user.balance}
                       onChange={(event) =>
                           setUser({...user, balance: parseFloat(event.target.value)} as User)
                       }
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                    value={user.role}
                    label="Role"
                    onChange={(event) =>
                        setUser({ ...user, role: event.target.value as "admin" | "user" })
                    }
                >
                    <MenuItem value={"user"}>User</MenuItem>
                    <MenuItem value={"admin"}>Admin</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <ButtonGroup>
                    <Button
                        variant="contained"
                        disabled={!checkIfEmpty(user.username) || !checkIfEmpty(user.email) || user.balance === null || user.balance === undefined || isNaN(user.balance)}
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => navigate('/users')}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            </Box>
        </Stack>
    );
}

export default UserEdit;