import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { StepperElement } from "../../app/models/stepperElement"
import { WizardStep } from "../../app/models/wizard"
import FormGroupElements from "../formgroup/FormGroup"
import HorizontalLinearStepper from "../wizard/Wizard1"


const SingleStepActivityElements : StepperElement[] = [
{
    label: "Nome attivita",
    isOpt: false,
    element: (
    <>
        <TextField id="name" label="Nome" variant="outlined" />
    </>
    )
},
{
    label: "Descrizione attivita",
    isOpt: false,
    element: (
    <>
        <TextField id="name" label="Descrizione" variant="outlined" />
    </>
    )
}
]

const createActivitySteps : WizardStep[] = [
{
    steptitle: "Nome e descrizione",
    isOptional: false,
    content: <FormGroupElements elements={SingleStepActivityElements}></FormGroupElements>
},
{
    steptitle: "Selezione periodo attività",
    isOptional: false,
    content: (
    <>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
            // onChange={handleChange}
        >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
    </>
    )
},
{
    steptitle: "Review",
    isOptional: false,
},
]

export default function CreateActivity() {
    return (
        <HorizontalLinearStepper steps={createActivitySteps}/>
    )
}