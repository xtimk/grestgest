import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../models/activity"
import AddIcon from '@mui/icons-material/Add';
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder";
import agent from "../../api/agent";
import PageHeader from "../../components/pageheader/PageHeader";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AppTableParams } from "../../models/apptable";


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

    const DeleteActivity = (activity : Activity) => (
        agent.Activity.delete(activity.id)
            .then(() => {
                toast.success("Attivita cancellata con successo");
                setActivities(activities.filter(item=>item!==activity));
            })
            .finally(() => {
                setLoading(false);
            })
    );

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
                                <Button onClick={() => DeleteActivity(item)}>Cancella</Button>
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