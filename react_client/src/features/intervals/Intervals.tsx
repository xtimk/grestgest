import { Button, Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Interval } from "../../app/models/interval";


export default function Intervals() {
    const [activities, setActivities] = useState<Interval[]>([]);

    function renderDay(dayasint : number) {
        switch(dayasint) {
            case 1:
                return 'Lunedì';
            case 2:
                return 'Martedì';
            case 3:
                return 'Mercoledì';
            case 4:
                return 'Giovedì';
            case 5:
                return 'Venerdì';
            case 6:
                return 'Sabato';
            case 7:
                return 'Domenica';
                                            
        }
      }

    useEffect(() => {
        fetch('http://localhost:5000/api/interval/GetAll')
          .then(response => response.json())
          .then(data => setActivities(data))
      }, [])


    return (
        <>
            <Toolbar />
            <Divider />
            <Toolbar>
                <Typography variant="h6">Elenco intervalli temporali</Typography>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{renderDay(item.day)}</TableCell>
                            <TableCell>{item.startingTime}</TableCell>
                            <TableCell>{item.endingTime}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/wizard">
                    Aggiungi Intervallo
                </Button>
            </Container>
        </>
    )
}