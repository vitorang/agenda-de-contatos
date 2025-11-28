import { AppBar, Avatar, Card, CardContent, Container, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, Toolbar, Typography } from "@mui/material";
import { ErrorOutline, Logout, PersonAdd, PlaylistRemove, SyncAlt } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import type ListItem from "../models/ListItem";
import Center from "../components/Center";
import './page.scss';
import { useNavigate } from "react-router";
import ContactService from "../services/ContactService";
import AccountService from "../services/AccountService";
import { RequestStatus } from "../helpers/constants";
import switchToAngular from "../helpers/switchToAngular";

export default function ContactListPage() {
    const [status, setStatus] = useState(RequestStatus.LOADING);
    const [contacts, setContacts] = useState([] as ListItem[]);
    const contactService = useRef(new ContactService());

    useEffect(() => {
        load();
        
        return () => contactService.current.abort();
    }, []);

    async function load()
    {
        try {
            setStatus(RequestStatus.LOADING);
            setContacts(await contactService.current.list());
            setStatus(RequestStatus.SUCCESS);
        }
        catch (error)
        {
            setStatus(RequestStatus.ERROR);
        }
    }

    return (
        <>
            <PageAppHeader />
            <Container maxWidth="md" className="pageMargin">
                <Card>
                    <CardContent>
                        <ContactList contacts={contacts} status={status} />
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

function PageAppHeader() {
    const navigate = useNavigate();
    const accountService = useRef(new AccountService());

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Meus Contatos
                </Typography>
                <IconButton title="Adicionar contato" onClick={() => navigate('./create')}>
                    <PersonAdd/>
                </IconButton>
                <IconButton title="Mudar para Angular" onClick={switchToAngular}>
                    <SyncAlt />
                </IconButton>
                <IconButton title="Sair" onClick={accountService.current.logout}>
                    <Logout />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

interface ContactListProps
{
    contacts: ListItem[]
    status: RequestStatus
}

function ContactList({contacts, status}: ContactListProps) {
    var navigate = useNavigate();

    if (status == RequestStatus.LOADING)
    {
        return (
            <List>
                {
                    Array.from(Array(5)).map((_, index) => (
                        <ListItemButton key={index} disabled={true}>
                            <ListItemAvatar>
                                <Skeleton variant="circular" width={40} height={40} />
                            </ListItemAvatar>
                            
                            <Skeleton  width={'100%'} height={40} />
                        </ListItemButton>       
                    ))
                }
            </List>
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
                    <Typography variant="subtitle1">Nenhum contato encontrado</Typography>
                </Stack>
            </Center>
        );
    }

    return (
        <List>
            {
                contacts.map(contact => (
                    <ListItemButton key={contact.value} onClick={() => navigate(`./edit/${contact.value}`)}>
                        <ListItemAvatar>
                            <Avatar />
                        </ListItemAvatar>
                        
                        <ListItemText
                            primary={<Typography noWrap={true}>{contact.label}</Typography>}
                        />
                    </ListItemButton> 
                ))
            }
        </List>
    );
}