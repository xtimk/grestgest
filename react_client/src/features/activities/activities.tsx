import { Button, Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../app/models/activity"
import AddIcon from '@mui/icons-material/Add';


export default function Activities() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/activity/GetAll')
          .then(response => response.json())
          .then(data => setActivities(data))
      }, [])


    return (
        <>
            {/* <Toolbar title="Activities">
                <Typography variant="h5">Activities</Typography>
            </Toolbar> */}
            <Toolbar />
            {/* <Toolbar>
                <Toolbar>
                    <Button size="large" variant="contained" onClick={addActivity}>Add Activity</Button>
                </Toolbar>
                <Toolbar>
                    <Button component={Link} to="/wizard" variant="contained" size="large">Wizard</Button>
                </Toolbar>
                <Toolbar>
                    <Button component={Link} to="/dialog" variant="contained" size="large">Dialog</Button>
                </Toolbar>
            </Toolbar> */}
            <Divider />
            <Toolbar>
                <Typography variant="h6">Tabella - Attività</Typography>
            </Toolbar>
            <Divider />
            <Container>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrizione</TableCell>
                            <TableCell>Quando</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.period.name}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
            <Toolbar />
            <Container>
                <Button variant="outlined" startIcon={<AddIcon />} component={Link} to="/wizard">
                    Aggiungi Attività
                </Button>
            </Container>
        </>
    )
}