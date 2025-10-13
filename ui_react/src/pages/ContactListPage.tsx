import { AppBar, Avatar, CircularProgress, Container, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Paper, Skeleton, Stack, Toolbar, Typography } from "@mui/material";
import { ErrorOutline, PersonAdd, PlaylistRemove } from "@mui/icons-material";
import AppHeaderMoreButton from "../components/AppHeaderMoreButton";
import { useState } from "react";
import type SimpleContact from "../models/SimpleContact";
import Center from "../components/Center";
import RequestStatus from "../constants/RequestStatus";
import './page.scss';
import { useNavigate } from "react-router";


export default function ContactListPage() {
    const [status, setStatus] = useState(RequestStatus.SUCCESS);
    const [contacts, setContacts] = useState([
        {id: '1', name: 'AEMOMAOSMAOS'},
        {id: '2', name: 'asdasdasd'},
        {id: '3', name: 'ewqr wetr'},
        {id: '4', name: 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM'}

    ] as SimpleContact[]);
   

    return <>
        <PageAppHeader />
        <Container maxWidth="md" className="pageMargin">
            <Paper elevation={1}>
                <ContactList contacts={contacts} status={status} />
            </Paper>
        </Container>
    </>;
}

function PageAppHeader() {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Meus Contatos
                </Typography>
                <IconButton title="Adicionar contato" onClick={() => navigate('./create')}>
                    <PersonAdd/>
                </IconButton>
                <AppHeaderMoreButton />
            </Toolbar>
        </AppBar>
    );
}

interface IContactListProps
{
    contacts: SimpleContact[]
    status: RequestStatus
}

function ContactList({contacts, status}: IContactListProps) {
    var navigate = useNavigate();

    if (status == RequestStatus.LOADING)
    {
        return (
            <Center>
                <CircularProgress/>
            </Center>
        );
    }

    if (status == RequestStatus.ERROR)
    {
        return (
            <Center>
                <Stack spacing={2} sx={{opacity: 0.5}}>        
                    <Center>
                        <ErrorOutline sx={{fontSize: '120px'}}/>
                    </Center>
                    <Typography variant="subtitle1">Ocorreu um erro</Typography>
                </Stack>
            </Center>
        );
    }

    if (contacts.length == 0) {
        return (
            <Center>
                <Stack spacing={2} sx={{opacity: 0.5}}>
                    <Center>
                        <PlaylistRemove sx={{fontSize: '120px'}}/>
                    </Center>
                    <Typography variant="subtitle1">Nenhum contato adicionado</Typography>
                </Stack>
            </Center>
        );
    }

    return (
        <List>
            {
                contacts.map((contact, index) => (
                    <ListItemButton key={index} onClick={() => navigate(`./edit/${contact.id}`)}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        
                        <ListItemText
                            primary={<Typography noWrap={true}>{contact.name}</Typography>}
                        />
                    </ListItemButton>            
                ))
            }
        </List>
    );
}