import { Toolbar, Divider, Typography } from "@mui/material";

interface Props {
    pageTitle: string
}

export default function PageHeader({pageTitle}: Props) {
    return (
        <>
            <Toolbar />
            <Divider />
            <Toolbar>
                <Typography variant="h6">{pageTitle}</Typography>
            </Toolbar>
            <Divider />
        </>
    )
}