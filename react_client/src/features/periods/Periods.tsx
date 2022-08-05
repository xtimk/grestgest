import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Period } from "../../app/models/period";
import agent from "../../app/api/agent";
import LoadingPlaceholder from "../loading/LoadingPlaceholder";


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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {periods.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.intervals.map(i => (i.name +", "))}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/wizard">
                    Aggiungi Periodo
                </Button>
            </Container>
        </>
    )
}