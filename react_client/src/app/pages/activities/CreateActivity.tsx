import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from "@mui/material"
import React, { useEffect, useState } from "react"
import agent from "../../api/agent"
import { ActivityCreation } from "../../models/activity"
import { Period } from "../../models/period"
import { StepperElement } from "../../models/stepperElement"
import FormGroupElements from "../../components/formgroup/FormGroup"
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder"
import PageHeader from "../../components/pageheader/PageHeader"




export default function CreateActivity() {
    const [period, setPeriod] = useState<Period[]>([]);

    const [selectItem, setSelectItem] = useState('');

    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [periodId, setPeriodId] = useState(0);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectItem(event.target.value as string);
        handleTextChange(event.target.value, setPeriodId);
    };

    useEffect(() => {
        agent.Period.list()
            .then(period => setPeriod(period))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    function createActivityHandler() {
        const activity_to_create: ActivityCreation = {
            name: name,
            description: description,
            periodId: periodId
        }
        
        var body = JSON.stringify(activity_to_create);
        console.log(body);

        agent.Activity.create(body);
    }

    function handleTextChange(value: string, func: React.Dispatch<React.SetStateAction<any>>) {
        func(value);
    }

    const FirstStepElements : StepperElement[] = [
        {
            label: "Nome attivita",
            isOpt: false,
            element: (
            <>
                <TextField id="Name" label="Nome" variant="outlined" onChange={(e) => handleTextChange(e.target.value, setName)}/>
            </>
            )
        },
        {
            label: "Descrizione attivita",
            isOpt: false,
            element: (
            <>
                <TextField id="Description" label="Descrizione" variant="outlined" onChange={(e) => handleTextChange(e.target.value, setDescription)}/>
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
    
    // const createActivitySteps : WizardStep[] = [
    //     {
    //         steptitle: "Nome e descrizione",
    //         isOptional: false,
    //         content: <FormGroupElements elements={FirstStepElements} />
    //     },
    //     {
    //         steptitle: "Selezione periodo attività",
    //         isOptional: false,
    //         content: <FormGroupElements elements={SecondStepElements}/>
    //     }
    // ]

    if (loading) {
        return <LoadingPlaceholder />
    }

    return (
        <>
            <PageHeader pageTitle="Crea Attività"/>
            <Toolbar />
            <FormGroupElements elements={[...FirstStepElements,...SecondStepElements]} />
            <Toolbar />
            <Divider />
            <Toolbar>
                <Button variant="outlined" size="large" onClick={createActivityHandler}>Crea</Button>
            </Toolbar>
        </>
    )
}