import { Grid, Typography } from "@mui/material";
import { StepperElement } from "../../app/models/stepperElement";

interface Props {
    elements: StepperElement[]
}

export default function FormGroupElements({elements}: Props) {
    return (
        <>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                {elements.map(item => (
                    <>
                        <Grid item xs={2}>
                            <Typography>
                                {item.label}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            {item.element}
                        </Grid>
                        <Grid item xs={1}/>
                    </>
                 ))}
            </Grid>
        </>
    )
}