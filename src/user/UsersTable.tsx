import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./User";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);
    const navigate = useNavigate();

    const validateRole = (role: any): "admin" | "user" => {
        return role === "admin" || role === "user" ? role : "user";
    };

    useEffect(() => {
        fetch("http://localhost:8080/users")
            .then((response) => response.json())
            .then((data) => {
                const formattedData: User[] = data.map((event: any) => ({
                    userId: event.userId,
                    username: event.username,
                    password: event.password,
                    email: event.email,
                    balance: event.balance,
                    role: validateRole(event.role),
                }));
                setUsers(formattedData);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError(new Error("Could not fetch users", { cause: error }));
            });
    }, []);

    const handleDeleteClick = (userId: number | undefined) => {
        fetch(`http://localhost:8080/users/${userId}`, {
            method: 'DELETE'
        }).then(() => setUsers(users.filter(oneUser => oneUser.userId !== userId)))
            .catch(error => {
                console.error("Error deleting user:", error);
                setError(new Error("Could not delete user", { cause: error }));
            });
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    function handleEditClick(userId: number | undefined) {
        if (!userId) {
            return;
        }
        navigate(`/users/edit/${userId}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Balance</TableCell>
                        <TableCell align="left">Role</TableCell>
                        <TableCell align="left">{/*edit*/}</TableCell>
                        <TableCell align="left">{/*delete*/}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.userId}>
                            <TableCell align="left">{user.userId}</TableCell>
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.balance}</TableCell>
                            <TableCell align="left">{user.role}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditClick(user.userId)} >
                                    Edit
                                </Button>
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleDeleteClick(user.userId)} color='warning'>
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