import { Grid, Typography } from "@mui/material";
import { StepperElement } from "../../models/stepperElement";

interface Props {
    elements: StepperElement[]
}

export default function FormGroupElements({elements}: Props) {
    return (
        <>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
                {elements.map(item => (
                    <>
                        <Grid item xs={2}>
                            <Typography>
                                {item.label}
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            {item.element}
                        </Grid>
                        <Grid item xs={1}/>
                    </>
                 ))}
            </Grid>
        </>
    )
}