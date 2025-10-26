import { useEffect } from "react";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";

export default function UnauthorizedRedirector()
{
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.onUnauthorized = redirectToLogin;

        return () => {
            ApiService.onUnauthorized = () => {}
        };
    }, []);

    function redirectToLogin() {
        navigate('/login');
    }

    return <></>;
}