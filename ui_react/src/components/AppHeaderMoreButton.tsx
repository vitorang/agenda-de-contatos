import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

export default function AppHeaderMoreButton()
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
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
            <MenuItem>Sair</MenuItem>
        </Menu>
    </>
}