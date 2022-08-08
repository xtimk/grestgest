import { Button, Divider, TextField, Toolbar } from "@mui/material"
import React, { useEffect, useState } from "react"
import agent from "../../api/agent"
import { StepperElement } from "../../models/stepperElement"
import FormGroupElements from "../../components/formgroup/FormGroup"
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder"
import PageHeader from "../../components/pageheader/PageHeader"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import { Interval } from "../../models/interval"
import { DropdownListItem } from "../../components/dropdowns/BaseDropdownList"
import { PeriodCreation } from "../../models/period"
import MultiSelectDropdownList from "../../components/dropdowns/MultiSelectDropdownList"

export default function CreatePeriod() {

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [intervalIds, setIntervalIds] = useState([]);
    const [intervals, setIntervals] = useState<Interval[]>([]);

    useEffect(() => {
        agent.Interval.list()
            .then(i => setIntervals(i))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    const IntervalsDropdownListItems : DropdownListItem[] = intervals.map(item => (
        {
            value: item.id,
            renderedValue: item.name,
        }
    ))

    function createItemHandler() {
        // setLoading(true);
        const item_to_create: PeriodCreation = {
            name: name,
            description: description,
            intervalIds: intervalIds
        }
        
        var body = JSON.stringify(item_to_create);
        // console.log(body);

        agent.Period.create(body)
            .then(() => toast.success("Periodo aggiunto con successo"))
            .finally(() => {
                setLoading(false);
                navigate('/periods');
            });
    }

    function handleTextChange(value: string, func: React.Dispatch<React.SetStateAction<any>>) {
        func(value);
    }

    const InputElements : StepperElement[] = [
        {
            label: "Nome periodo",
            isOpt: false,
            element: (
                <TextField id="Name" label="Nome" variant="outlined" onChange={(e) => handleTextChange(e.target.value, setName)}/>
            )
        },
        {
            label: "Descrizione periodo",
            isOpt: false,
            element: (
                <TextField id="Descrizione" label="Descrizione" variant="outlined" onChange={(e) => handleTextChange(e.target.value, setDescription)}/>
            )
        },
        {
            label: "Selezione intervalli",
            isOpt: false,
            element : (
                <MultiSelectDropdownList label="intervalli" setValue={setIntervalIds} items={IntervalsDropdownListItems}/>
            )
        }
    ]
    
    if (loading) {
        return <LoadingPlaceholder />
    }

    return (
        <>
            <PageHeader pageTitle="Crea Periodo"/>
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