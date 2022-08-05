import { Toolbar, Grid, CircularProgress } from "@mui/material";

export default function LoadingPlaceholder() {
    return (
        <>
            <Toolbar />
            <Toolbar>
                <Grid container spacing={0}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                        <CircularProgress size={50}/>
                    </Grid>
                    <Grid item xs={4} />
                </Grid>
            </Toolbar>
        </>
    )
}