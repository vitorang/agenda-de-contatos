import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import AccountService from "../services/AccountService";

export default function AppHeaderMoreButton()
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const accountService = useRef(new AccountService());
    
    const open = Boolean(anchorEl);
    
    function showMenu(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
    };
    
    function onClose() {
        setAnchorEl(null);
    };

    return <>
        <IconButton onClick={showMenu}>
            <MoreVert/>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
            <MenuItem onClick={accountService.current.logout}>Sair</MenuItem>
        </Menu>
    </>
}