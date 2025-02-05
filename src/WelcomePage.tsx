import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const WelcomePage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
                <Typography variant="h6" color="text.secondary" paragraph>
                    This is the administration dashboard for the Stávková kancelária app. Use the navigation bar to see and manage sport events, users and their tickets.
                </Typography>
            </Box>
        </Container>
    );
};

export default WelcomePage;
