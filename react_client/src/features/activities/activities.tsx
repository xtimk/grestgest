import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../app/models/activity"
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import LoadingPlaceholder from "../loading/LoadingPlaceholder";
import PageHeader from "../pageheader/PageHeader";
import agent from "../../app/api/agent";


export default function Activities() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Activity.list()
            .then(activities => setActivities(activities))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    if(loading) {
        return (
            <>
                <Toolbar />
                <Divider />
                <Toolbar>
                    <Typography variant="h6">Elenco Attività</Typography>
                </Toolbar>
                <Divider />
                <LoadingPlaceholder />
            </>
        )
    }

    const DeleteActivity = (activityId : number) => (agent.Activity.delete(activityId));

    return (
        <>
            <PageHeader pageTitle="Elenco Attività"/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrizione</TableCell>
                            <TableCell>Quando</TableCell>
                            <TableCell>Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.period?.name}</TableCell>
                            <TableCell>
                                <Button onClick={() => DeleteActivity(item.id)}>Cancella</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/activities/create">
                    Aggiungi Attività
                </Button>
            </Container>
        </>
    )
}