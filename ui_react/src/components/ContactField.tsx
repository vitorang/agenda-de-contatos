import { Box, IconButton, TextField } from "@mui/material";
import type { Address } from "../models/Contact"
import type FieldUpdate from "../models/FieldUpdate";
import { Remove } from "@mui/icons-material";

export type contactFieldType = 'phone' | 'email' | 'address'
const boxSx = { display: 'flex', alignItems: 'flex-end' };
const w100 = {width: '100%'};

interface IContactField
{
    type: contactFieldType
    value: string | Address
    index: number
    update: FieldUpdate
}

export default function ContactField({type, value, index, update}: IContactField)
{
    var child = <></>;

    if (type == 'phone')
    {
        child = <TextField variant="standard" defaultValue={value} placeholder="(00) 12345-6789" sx={w100}
            onBlur={event => update?.edit(index, event.target.value)}/>
            
    }
    else if (type == 'email')
    {
        child = <TextField variant="standard" defaultValue={value} placeholder="contato@agenda.com" sx={w100}
            onBlur={event => update?.edit(index, event.target.value)}/>
            
    }
    else if (type == 'address')
    {
        child = <TextField variant="standard" defaultValue={value} placeholder="Rua, número - Bairro - Cidade/Estado"
            sx={w100} slotProps={{htmlInput: {readOnly: true}}} />
    }

    return (
        <Box sx={boxSx}>
            {child}
            <IconButton color="error" onClick={() => update.remove(index)}>
                <Remove/>
            </IconButton>    
        </Box>
    );
}