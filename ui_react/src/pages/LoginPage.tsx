import { Alert, Button, Card, CardActions, CardContent, Stack, TextField } from "@mui/material";
import Center from "../components/Center";
import { useEffect, useRef, useState } from "react";
import AccountService from "../services/AccountService";
import { useNavigate } from "react-router";


export default function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([] as string[])
    const [loading, setLoading] = useState(false);
    const accountService = useRef(new AccountService());
    const navigate = useNavigate();

     useEffect(() => {
        return () => accountService.current.abort();
      }, []);
 
    async function submit()
    {
        setLoading(true);
        var errors = [];

        try {
            
            if (isRegister)
            {
                if (!username.match(/^[a-z0-9]{3,15}$/))
                    errors.push('Usuário deve ter de 3 a 15 letras e números');

                if (!password.match(/^.{3,15}$/))
                    errors.push('Senha deve ter de 3 a 15 caracteres');

                if (errors.length == 0)
                {
                    if (await accountService.current.checkInUse(username))
                        errors.push('Nome de usuário está em uso');
                    else
                    {
                        await accountService.current.register({username, password});
                        onLoginSuccess();
                    }
                }
            }
            else
            {
                await accountService.current.login({username, password});
                onLoginSuccess();
            }
        }
        catch(error)
        {
            var axError = accountService.current.axiosError(error);
            if (axError?.status == 404)
                errors.push('Login incorreto')
            else
                errors.push('Ocorreu um erro');
        }
        finally
        {
            setErrors(errors);
            setLoading(false);
        }
    }

    function onLoginSuccess()
    {
        navigate('/');
    }

    function toggleRegister()
    {
        if (loading)
            return;

        setIsRegister(previous => !previous);
        setErrors([]);
    }

    return (
        <Center sx={{height: '100vh'}}>
            <Card sx={{width: '360px', maxWidth: '100%'}} >
                <CardContent>
                    <Stack spacing={2}>  
                        <TextField
                            label="Nome de usuário"
                            variant="outlined"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Senha"
                            variant="outlined"
                            type="password" 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        {
                            errors.length == 0 ? <></> :
                            <Alert variant="outlined" severity="warning">
                                <ul style={{margin: '0'}}>
                                    {
                                        errors.map(e => <li key={e}>{e}</li>)
                                    }
                                </ul>
                            </Alert>
                        }
                        
                        <Button onClick={submit} disabled={loading} variant="contained">
                            { isRegister ? 'Cadastrar' : 'Entrar' }
                        </Button>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button onClick={toggleRegister} disabled={loading} size="small">
                        { isRegister ? 'Possui conta?' :  'Cadastre-se' }
                    </Button>
                </CardActions>                    
            </Card>                
        </Center>
    );
}