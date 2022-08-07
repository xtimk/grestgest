import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Interval, renderDay } from "../../models/interval";
import agent from "../../api/agent";
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder";
import { toast } from "react-toastify";


export default function Intervals() {
    const [intervals, setIntervals] = useState<Interval[]>([]);
    const [loading, setLoading] = useState(true);

    const pageTitle = "Elenco intervalli temporali"

    useEffect(() => {
        agent.Interval.list()
            .then(intervals => setIntervals(intervals))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    const DeleteInterval = (interval : Interval) => (
        agent.Interval.delete(interval.id)
            .then(() => {
                toast.success("Intervallo cancellato con successo");
                setIntervals(intervals.filter(item=>item!==interval));
            })
            .finally(() => {
                setLoading(false);
            })
    );

    if(loading) {
        return (
            <>
                <Toolbar />
                <Divider />
                <Toolbar>
                    <Typography variant="h6">{pageTitle}</Typography>
                </Toolbar>
                <Divider />
                <LoadingPlaceholder />
            </>
        )
    }
    
    return (
        <>
            <Toolbar />
            <Divider />
            <Toolbar>
                <Typography variant="h6">{pageTitle}</Typography>
            </Toolbar>
            <Divider />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Giorno</TableCell>
                            <TableCell>Ora Inizio</TableCell>
                            <TableCell>Ora Fine</TableCell>
                            <TableCell>Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {intervals.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{renderDay(item.day)}</TableCell>
                            <TableCell>{item.startingTime}</TableCell>
                            <TableCell>{item.endingTime}</TableCell>
                            <TableCell>
                                <Button onClick={() => DeleteInterval(item)}>Cancella</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/intervals/create">
                    Aggiungi Intervallo
                </Button>
            </Container>
        </>
    )
}