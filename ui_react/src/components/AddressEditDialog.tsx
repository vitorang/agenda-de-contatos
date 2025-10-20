import { useState } from "react";
import { type Address } from "../models/Contact";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Stack, TextField } from "@mui/material";
import { w100 } from "../constants/styles";
import { Search } from "@mui/icons-material";
import { neighborhoods } from "../constants/neighborhoods";

interface AddressEditDialogProps {
    onClose: (value: Address | null) => void
    open: boolean
}

export default function AddressEditDialog({open, onClose} : AddressEditDialogProps) {
    var [postalCode, setPostalCode] = useState('');
    var [state, setState] = useState('');
    var [city, setCity] = useState('');
    var [neighborhood, setNeighborhood] = useState('');
    var [street, setStreet] = useState('');
    var [number, setNumber] = useState('');
    var [complement, setComplement] = useState('');


    function onNumberChange(value: string) {
        setNumber(value.replace(/\D/, ''));
    }

    function onPostalCodeChange(value: string) {
        setPostalCode(value.replace(/\D/, ''));
    }

    function isValidPostalCode() {
        return postalCode.match(/^\d{8}$/);
    }

    function isValid() {
        return state && city && neighborhood && street && parseInt(number) > 0;
    }

    function close(ok: boolean) {
        var address = ok ? { 
            city, complement, neighborhood, state, street,
            number: parseInt(number), 
        } as Address : null

        clear();
        return onClose(address);
    }

    function clear()
    {
        setPostalCode('');
        setState('');
        setCity('');
        setNeighborhood('');
        setStreet('');
        setNumber('');
        setComplement('');
    }

    return (
        <Dialog open={open} onClose={() => close(false)}>
            <DialogTitle>Endereço</DialogTitle>
            <DialogContent>
                <Stack spacing={2}>
                    <Box sx={{ display: 'flex' }}>
                        <TextField label='Pesquisar CEP' variant='standard' sx={{flex: 1}}
                            inputMode='numeric' value={postalCode} slotProps={{htmlInput:{ maxLength: 8 }}}
                            onChange={e => onPostalCodeChange(e.target.value)} />
                        <IconButton disabled={!isValidPostalCode()}>
                            <Search/>
                        </IconButton>
                    </Box>

                    <Grid container={true} spacing={2}>
                        <Grid size={{xs: 12, sm: 9}}>
                            <TextField label='Cidade' value={city} onChange={e => setCity(e.target.value)}
                                variant='standard' required={true} sx={w100} />
                        </Grid>
                        <Grid size={{xs: 12, sm: 3}}>
                            <TextField select label='Estado' value={state} onChange={e => setState(e.target.value)}
                                variant='standard' required={true} sx={w100}>
                            {
                                Object.entries(neighborhoods).map(n => (
                                    <MenuItem key={n[0]} value={n[0]}>
                                        <Box sx={{display: { xs: 'none', sm: 'block' }}}>{n[0]}</Box> 
                                        <Box sx={{display: { xs: 'block', sm: 'none' }}}>{n[1]}</Box>
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                        </Grid>
                    </Grid>
                        
                        
                    <TextField label='Bairro' value={neighborhood} onChange={e => setNeighborhood(e.target.value)}
                        variant='standard' required={true} sx={w100} />
                    <TextField label='Rua' value={street} onChange={e => setStreet(e.target.value)}
                        variant='standard' required={true} sx={w100} />
                    <Grid container={true} spacing={2}>
                        <Grid size={{xs: 4}}>
                            <TextField label='Número' value={number} onChange={e => onNumberChange(e.target.value)}
                                variant='standard' required={true} sx={w100} inputMode='numeric' />
                        </Grid>
                        <Grid size={{xs: 8}}>
                            <TextField label='Complemento' value={complement} onChange={e => setComplement(e.target.value)}
                            variant='standard' sx={w100} />
                        </Grid>
                    </Grid>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => close(false)}>Cancelar</Button>
                <Button onClick={() => close(true)} disabled={!isValid()}>Adicionar</Button>
            </DialogActions>
      </Dialog>
    );

}