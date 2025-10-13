import { Alert, Button, Card, CardActions, CardContent, Stack, TextField } from "@mui/material";
import Center from "../components/Center";

export default function LoginPage() {
    return (
        <Center sx={{height: '100vh'}}>
            <Card sx={{width: '360px', maxWidth: '100%'}} >
                <CardContent>
                    <Stack spacing={2}>  
                        <TextField
                            label="Nome de usuário"
                            variant="outlined"
                        />
                        <TextField
                            label="Senha"
                            variant="outlined"
                            type="password" 
                            />
                        <Alert variant="outlined" severity="warning">Mensagem de erro</Alert>
                        <Button variant="contained" disabled={true}>Entrar</Button>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button size="small">Cadastre-se</Button>
                </CardActions>                    
            </Card>                
        </Center>
    );
}