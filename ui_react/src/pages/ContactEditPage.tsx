import { AppBar, Avatar, Card, CardContent, Container, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { ChevronLeft, PersonRemove } from "@mui/icons-material";
import AppHeaderMoreButton from "../components/AppHeaderMoreButton";
import { type Address } from "../models/Contact";
import Center from "../components/Center";
import { useState } from "react";
import type Contact from "../models/Contact";
import type FieldUpdate from "../models/FieldUpdate";
import ContactSection from "../components/ContactSection";
import './page.scss';
import { useNavigate } from "react-router";
import AddressEditDialog from "../components/AddressEditDialog";
import { w100 } from "../constants/styles";

type contactSections = {
    phones: string[]
    emails: string[]
    addresses: Address[]
}

export default function ContactEditPage() {
    const [addressDialogOpen, setAddressDialogOpen] = useState(false);
    const [contact, setContact] = useState({
        id: '',
        name: '',
        addresses: [],
        emails: [],
        phones: []
    } as Contact);

    function setName(name: string) {
        setContact((previous) => {
            return Object.assign({}, previous, {name});
        })
    }

    function onAddressDialogClose(value: Address | null) {
        if (value)
            setContact(Object.assign({}, contact, {addresses: [...contact.addresses, value]}));

        setAddressDialogOpen(false);
    }

    function update(contact: Contact, section: 'addresses' | 'emails' | 'phones'): FieldUpdate
    {
        return {
            add: () => {
                var model: Partial<contactSections> = {};

                if (section == 'addresses')
                    setAddressDialogOpen(true);
                else
                {
                    model[section] = [...(contact[section] ?? []), ''];

                    setContact((previous) => {
                        return Object.assign({}, previous, model);
                    })
                }                
            },
            edit: (index: number, value: string | Address) => {
                var model: Partial<contactSections> = {};
                model[section] = [...contact[section] as (string[] & Address[])];
                model[section]![index] = value;
                
                setContact((previous) => {
                    return Object.assign({}, previous, model);
                })
            },
            remove: (index: number) => {
                var model: Partial<contactSections> = {};
                model[section] = [...contact[section] as (string[] & Address[])];
                model[section].splice(index, 1);
                console.log(index, contact[section], model[section]);

                setContact((previous) => {
                    return Object.assign({}, previous, model);
                })
            }
        };
    }

    return <>
        <PageAppHeader/>
        <Container maxWidth="md" className="pageMargin">
            <Grid container={true} spacing={2}>
                <Grid size={{xs: 12}}>
                    <ProfileSection name={contact.name} setName={setName} />
                </Grid>
                <Grid size={{xs: 12, md: 5}}>
                    <Stack spacing={2}>
                        <ContactSection type="phone" title="Telefones" values={contact.phones} update={update(contact, 'phones')} />
                        <ContactSection type="email" title="E-mails" values={contact.emails} update={update(contact, 'emails')} />
                    </Stack>
                </Grid>
                <Grid size={{xs: 12, md: 7}}>
                    <ContactSection type="address" title="Endereços" values={contact.addresses} update={update(contact, 'addresses')} />                    
                </Grid>
            </Grid>
        </Container>
        <AddressEditDialog onClose={onAddressDialogClose} open={addressDialogOpen} />
    </>;
}

function PageAppHeader()
{
    const navigate = useNavigate();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton title="Voltar" onClick={() => navigate('../')}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Editar contato
                </Typography>
                <IconButton title="Excluir contato">
                    <PersonRemove />
                </IconButton>
                <AppHeaderMoreButton/>
            </Toolbar>
        </AppBar>
    );
}

interface ProfileSectionProps
{
    name: string
    setName: (name: string) => void
}

function ProfileSection({name, setName}: ProfileSectionProps)
{
    return (
         <Card>
            <CardContent>
                <Center>
                    <Avatar sx={{ width: 96, height: 96, marginBottom: '1em' }} />    
                </Center>
                <TextField label='Nome' variant="standard" required={true} defaultValue={name} sx={w100} 
                    onBlur={event => setName(event.target.value)}/>
            </CardContent>
        </Card>
    );
}