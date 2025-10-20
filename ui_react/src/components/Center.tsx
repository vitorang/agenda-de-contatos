import type { ReactNode } from "react";
import './Center.scss';
import { Box, type SxProps, type Theme } from "@mui/material";

interface CenterProps
{
    children: ReactNode
    sx?: SxProps<Theme>
}

export default function Center({children, sx}: CenterProps)
{
    return (
        <Box sx={sx}>
            <div className="c-Center">
                {children}
            </div>
        </Box>
    );
}