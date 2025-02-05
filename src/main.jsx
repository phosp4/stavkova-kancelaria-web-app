import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {SportEventTable} from "./sportevent/SportEventTable.tsx";
import UsersTable from "./user/UsersTable.tsx";
import Navbar from "./Navbar.tsx";
import WelcomePage from "./WelcomePage.tsx";
import SportEventEdit from "./sportevent/SportEventEdit.tsx";
import {TicketTable} from "./ticket/TicketTable.tsx";
import UserEdit from "./user/UserEdit.tsx";
import TicketEdit from "./ticket/TicketEdit.tsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/sport-events" element={<SportEventTable />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/tickets" element={<TicketTable />} />
                <Route path="/sport-events/edit/:eventId" element={<SportEventEdit />}/>
                <Route path="/users/edit/:userId" element={<UserEdit />}/>
                <Route path="/tickets/edit/:ticketId" element={<TicketEdit />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);