import { AppBar, Avatar, Card, CardContent, Container, Grid, IconButton, Stack, TextField, Toolbar, Typography } from "@mui/material";
import { ChevronLeft, PersonRemove } from "@mui/icons-material";
import { type Address } from "../models/Contact";
import Center from "../components/Center";
import { useEffect, useRef, useState } from "react";
import type Contact from "../models/Contact";
import type FieldUpdate from "../models/FieldUpdate";
import ContactSection from "../components/ContactSection";
import './page.scss';
import { useNavigate } from "react-router";
import AddressEditDialog from "../components/AddressEditDialog";
import { w100 } from "../constants/styles";
import ContactService from "../services/ContactService";

type contactSections = {
    phones: string[]
    emails: string[]
    addresses: Address[]
}

export default function ContactEditPage() {
    const contactService = useRef(new ContactService());
    const [addressDialogOpen, setAddressDialogOpen] = useState(false);
    const [contact, setContact] = useState({
        id: '',
        name: '',
        addresses: [],
        emails: [],
        phones: []
    } as Contact);

    useEffect(() => {
        load();

        return () => contactService.current.abort();
    }, []);

    async function load()
    {
        try
        {

        }
        catch
        {
            
        }
    }
    
    function onAddressDialogClose(value: Address | null) {
        if (value)
            setContact(Object.assign({}, contact, {addresses: [...contact.addresses, value]}));

        setAddressDialogOpen(false);
    }

    function setData(data: Partial<Contact>){
        setContact((previous) => {
            return Object.assign({}, previous, data);
        });
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

                setContact((previous) => {
                    return Object.assign({}, previous, model);
                })
            }
        };
    }

    function canExclude()
    {
        return !!contact.id;
    }

    function canSave()
    {
        return !!contact.name.trim();
    }

    async function save()
    {
        if (!canSave)
            return;

        try
        {
            var saved = await contactService.current.save({
                id: contact.id,
                name: contact.name.trim(),
                addresses: contact.addresses,
                emails: contact.emails,
                phones: contact.phones
            });

            setData({id: saved.id});
        }
        catch (error)
        {
            console.error(error);
        }
    }

    async function exclude()
    {
        if (!canExclude)
            return false;

        try
        {

            return true;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    return (
        <>
            <PageAppHeader save={save} exclude={exclude} canSave={canSave()} canExclude={canExclude()} />
            <Container maxWidth="md" className="pageMargin">
                <Grid container={true} spacing={2}>
                    <Grid size={{xs: 12}}>
                        <ProfileSection name={contact.name} setData={setData} />
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
        </>
    );
}


interface PageAppHeaderProps
{
    save: () => Promise<void>
    exclude: () => Promise<boolean>
    canSave: boolean
    canExclude: boolean
}
function PageAppHeader({ canSave, save, canExclude, exclude }: PageAppHeaderProps)
{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    function goBack()
    {
        navigate('../');
    }

    async function onClickSave()
    {
        if (loading)
            return;

        setLoading(true);
        await save();
        setLoading(false);
    }

    async function onClickExclude()
    {
        if (loading)
            return;

        setLoading(true);
        if (await exclude())
            goBack();
        setLoading(false);
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton title="Voltar" onClick={goBack} disabled={loading}>
                    <ChevronLeft />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Editar contato
                </Typography>
                <IconButton title="Gravar alterações" onClick={onClickSave} disabled={loading || !canSave}>
                    <PersonRemove />
                </IconButton>
                <IconButton title="Excluir contato" onClick={onClickExclude} disabled={loading || !canExclude}>
                    <PersonRemove />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

interface ProfileSectionProps
{
    name: string
    setData: (data: Partial<Contact>) => void
}

function ProfileSection({name, setData}: ProfileSectionProps)
{
    return (
         <Card>
            <CardContent>
                <Center>
                    <Avatar sx={{ width: 96, height: 96, marginBottom: '1em' }} />    
                </Center>
                <TextField label='Nome' variant="standard" required={true} defaultValue={name} sx={w100} 
                    onBlur={ event => setData({name: event.target.value}) }/>
            </CardContent>
        </Card>
    );
}