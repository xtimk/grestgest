import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Period } from "../../models/period";
import agent from "../../api/agent";
import LoadingPlaceholder from "../../components/loading/LoadingPlaceholder";
import { toast } from "react-toastify";


export default function Periods() {
    const [periods, setPeriods] = useState<Period[]>([]);
    const [loading, setLoading] = useState(true);

    const pageTitle = "Elenco Periodi";

    useEffect(() => {
        agent.Period.list()
            .then(periods => setPeriods(periods))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    },[])

    const DeletePeriod = (period : Period) => (
        agent.Period.delete(period.id)
            .then(() => {
                toast.success("Intervallo cancellato con successo");
                setPeriods(periods.filter(item=>item!==period));
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
                            <TableCell>Intervalli</TableCell>
                            <TableCell>Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {periods.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.intervals.map(i => (i.name +", "))}</TableCell>
                            <TableCell>
                                <Button onClick={() => DeletePeriod(item)}>Cancella</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/periods/create">
                    Aggiungi Periodo
                </Button>
            </Container>
        </>
    )
}