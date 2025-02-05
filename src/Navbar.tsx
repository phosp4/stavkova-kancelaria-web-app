import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import config from "./config";

const pages = [
    { name: 'Sport Events', path: '/sport-events' },
    { name: 'Users', path: '/users' },
    { name: 'Tickets', path: '/tickets' }
];
function Navbar() {

    const navigate = useNavigate();

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: grey[800] }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={config.baseUrl}
                        sx={{
                            mr: 2,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Stávkova Kancelária
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handleButtonClick(page.path)}
                                sx={{ my: 2, mx: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}


export default Navbar;
