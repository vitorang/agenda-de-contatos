import { Alert, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import type { Address } from "../models/Contact";
import Center from "./Center";
import type { contactFieldType } from "./ContactField";
import type FieldUpdate from "../models/FieldUpdate";
import ContactField from "./ContactField";

interface ContactSectionProps
{
    title: string
    type: contactFieldType
    values: string[] | Address[]
    update: FieldUpdate
}

export default function ContactSection({title, type, values, update}: ContactSectionProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" noWrap={true} sx={{marginBottom: '4px'}}>{title}</Typography>
                <Stack spacing={1} sx={{paddingBottom: '1em'}}>
                {
                    values.length == 0 ? 
                        <Alert variant="outlined" severity="info">Nenhum cadastrado</Alert>
                        : <></>
                }
                { 
                    values.map((value, index) => <ContactField type={type} key={`${index}_${value}`}
                        value={value} index={index} update={update}/>)
                }
                </Stack>

                <Center>
                    <Button variant="outlined" onClick={update.add}>Adicionar</Button>
                </Center>
            </CardContent>
        </Card>
    );
}