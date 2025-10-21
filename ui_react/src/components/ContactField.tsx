import { Box, IconButton, TextField } from "@mui/material";
import type { Address } from "../models/Contact"
import type FieldUpdate from "../models/FieldUpdate";
import { Remove } from "@mui/icons-material";
import { w100 } from "../constants/styles";

export type contactFieldType = 'phone' | 'email' | 'address'
const boxSx = { display: 'flex', alignItems: 'flex-end', width: '100%' };

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
        child = <TextField variant='standard' defaultValue={value} placeholder='(00) 12345-6789' sx={w100}
            onBlur={event => update?.edit(index, event.target.value)}/>
            
    }
    else if (type == 'email')
    {
        child = <TextField variant='standard' defaultValue={value} placeholder='contato@agenda.com' sx={w100}
            onBlur={event => update?.edit(index, event.target.value)}/>
            
    }
    else if (type == 'address')
    {
        let addr = value as Address;
        let line1 = `${addr.street}, n° ${addr.number}`;
        if (addr.complement)
            line1 += `, ${addr.complement}`;

        let line2 = addr.neighborhood;
        let line3 = `${addr.city} - ${addr.state}`;
        let textValue = [line1, line2, line3].join('\n');

        child = (
            <TextField variant='outlined' sx={w100} value={textValue}
                multiline={true} slotProps={{input: {readOnly: true}}} />
        );
    }

    return (
        <Box sx={boxSx}>
            {child}
            <IconButton color='error' onClick={() => update.remove(index)}>
                <Remove/>
            </IconButton>    
        </Box>
    );
}