import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from "@mui/material"
import React, { useEffect, useState } from "react"
import agent from "../../api/agent"
import { ActivityCreation } from "../../models/activity"
import { Period } from "../../models/period"
import { StepperElement } from "../../models/stepperElement"
import FormGroupElements from "../../components/formgroup/FormGroup"
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder"
import PageHeader from "../../components/pageheader/PageHeader"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import BaseDropdownList, { DropdownListItem } from "../../components/dropdowns/BaseDropdownList"




export default function CreateActivity() {
    const [period, setPeriod] = useState<Period[]>([]);

    const [selectItem, setSelectItem] = useState('');

    const [loading, setLoading] = useState(true);

    const [name, setName] = useState('');

    const [description, setDescription] = useState('');

    const [periodId, setPeriodId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        agent.Period.list()
            .then(period => setPeriod(period))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    const PeriodDropdownListItems : DropdownListItem[] = period.map(item => (
        {
            value: item.id,
            renderedValue: item.name,
        }
    ))

    function createActivityHandler() {
        setLoading(true);
        const activity_to_create: ActivityCreation = {
            name: name,
            description: description,
            periodId: periodId
        }
        
        var body = JSON.stringify(activity_to_create);
        console.log(body);
        agent.Activity.create(body)
            .then(() => toast.success("Attivita aggiunta con successo"))
            .finally(() => {
                setLoading(false);
                navigate('/activities');
            });
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
                <BaseDropdownList label="Periodo attivita" setValue={setPeriodId} items={PeriodDropdownListItems}/>
            )
        }
    ]

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