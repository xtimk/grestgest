import { Button, Divider, MenuItem, Select, SelectChangeEvent, TextField, Toolbar } from "@mui/material"
import React, { useState } from "react"
import agent from "../../api/agent"
import { StepperElement } from "../../models/stepperElement"
import FormGroupElements from "../../components/formgroup/FormGroup"
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder"
import PageHeader from "../../components/pageheader/PageHeader"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import { Days, IntervalCreation, renderDay } from "../../models/interval"
import BasicTimePicker from "../../components/timepicker/TextFieldTimePicker"
import BaseDropdownList, { DropdownListItem } from "../../components/dropdowns/BaseDropdownList"

export default function CreateInterval() {

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    
    const [day, setDay] = useState(1);
    const DaysDropDownListItems : DropdownListItem[] = Days.map(item => (
        {
            value: item,
            renderedValue: renderDay(item),
        }
    ))

    const [startingTime, setStartingTime] = useState('');   
    
    const [endingTime, setEndingTime] = useState('');

    const navigate = useNavigate();

    function createItemHandler() {
        setLoading(true);
        const item_to_create: IntervalCreation = {
            name: name,
            day: day,
            startingTime: startingTime,
            endingTime: endingTime
        }
        
        var body = JSON.stringify(item_to_create);
        console.log(body);

        agent.Interval.create(body)
            .then(() => toast.success("Intervallo aggiunto con successo"))
            .finally(() => {
                setLoading(false);
                navigate('/intervals');
            });
    }

    function handleTextChange(value: string, func: React.Dispatch<React.SetStateAction<any>>) {
        func(value);
    }

    const InputElements : StepperElement[] = [
        {
            label: "Nome intervallo",
            isOpt: false,
            element: (
                <TextField id="Name" label="Nome" variant="outlined" onChange={(e) => handleTextChange(e.target.value, setName)}/>
            )
        },          
        {
            label: "Selezione giornata",
            isOpt: false,
            element: (
                <BaseDropdownList label="giorno" setValue={setDay} items={DaysDropDownListItems}/>
            )
        },
        {
            label: "Orario inzio",
            isOpt: false,
            element: (
                <BasicTimePicker label="Orario inizio" startingTime={startingTime} setStartingTime={setStartingTime}/>
            )
        },
        {
            label: "Orario fine",
            isOpt: false,
            element: (
                <BasicTimePicker label="Orario fine" startingTime={endingTime} setStartingTime={setEndingTime}/>
            )
        }
    ]
    
    if (loading) {
        return <LoadingPlaceholder />
    }

    return (
        <>
            <PageHeader pageTitle="Crea Intervallo"/>
            <Toolbar />
            <FormGroupElements elements={InputElements} />
            <Toolbar />
            <Divider />
            <Toolbar>
                <Button variant="outlined" size="large" onClick={createItemHandler}>Crea</Button>
            </Toolbar>
        </>
    )
}