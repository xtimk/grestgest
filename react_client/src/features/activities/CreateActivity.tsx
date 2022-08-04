import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Period } from "../../app/models/period"
import { StepperElement } from "../../app/models/stepperElement"
import { WizardStep } from "../../app/models/wizard"
import FormGroupElements from "../formgroup/FormGroup"
import LoadingPlaceholder from "../loading/LoadingPlaceholder"
import PageHeader from "../pageheader/PageHeader"
import HorizontalLinearStepper from "../wizard/Wizard1"




export default function CreateActivity() {
    const [period, setPeriod] = useState<Period[]>([]);

    const [selectItem, setSelectItem] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelectItem(event.target.value as string);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
    axios.get('http://localhost:5000/api/Period/GetAll')
        .then(response => setPeriod(response.data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    function createActivity() {
        var name = document.getElementById("Name");
        var description = document.getElementById("Description");
        var periodId = document.getElementById("PeriodId");

        console.log(name);
    }

    const FirstStepElements : StepperElement[] = [
        {
            label: "Nome attivita",
            isOpt: false,
            element: (
            <>
                <TextField id="Name" label="Nome" variant="outlined" />
            </>
            )
        },
        {
            label: "Descrizione attivita",
            isOpt: false,
            element: (
            <>
                <TextField id="Description" label="Descrizione" variant="outlined" />
            </>
            )
        }
    ]
    
    const SecondStepElements : StepperElement[] = [
        {
            label: "Selezione periodo attivita",
            isOpt: false,
            element: (
            <>
                <Select
                    labelId="Periodo"
                    id="periodId"
                    value={selectItem}
                    label="Periodo *"
                    onChange={handleChange}
                    variant='outlined'
                >
                    {period.map(item => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </>
            )
        }
    ]
    
    const createActivitySteps : WizardStep[] = [
        {
            steptitle: "Nome e descrizione",
            isOptional: false,
            content: <FormGroupElements elements={FirstStepElements} />
        },
        {
            steptitle: "Selezione periodo attività",
            isOptional: false,
            content: <FormGroupElements elements={SecondStepElements}/>
        }
    ]

    if (loading) {
        return <LoadingPlaceholder />
    }

    return (
        // <HorizontalLinearStepper steps={createActivitySteps}/>
        <>
            <PageHeader pageTitle="Crea Attività"/>
            <Toolbar />
            <FormGroupElements elements={[...FirstStepElements,...SecondStepElements]} />
            <Toolbar />
            <Divider />
            <Toolbar>
                <Button variant="outlined" size="large" onClick={createActivity}>Crea</Button>
            </Toolbar>
        </>
    )
}