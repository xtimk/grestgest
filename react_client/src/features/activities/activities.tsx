import { Grid3x3 } from "@mui/icons-material";
import { Box, Button, Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity } from "../../app/models/activity"

export default function Activities() {
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/activity/GetAll')
          .then(response => response.json())
          .then(data => setActivities(data))
      }, [])

      function addActivity() {
        setActivities(prevState => [...prevState, {
          id: prevState.length + 200,
          name: "Falegnameria " + (prevState.length), 
          description: "Attivita di falegnameria",
          periodId: 4
        }])
      }

    return (
        <>
            {/* <Toolbar title="Activities">
                <Typography variant="h5">Activities</Typography>
            </Toolbar> */}
            <Toolbar />
            <Toolbar>
                <Toolbar>
                    <Button size="large" variant="contained" onClick={addActivity}>Add Activity</Button>
                </Toolbar>
                <Toolbar>
                    <Button component={Link} to="/wizard" variant="contained" size="large">Wizard</Button>
                </Toolbar>
                <Toolbar>
                    <Button component={Link} to="/dialog" variant="contained" size="large">Dialog</Button>
                </Toolbar>
            </Toolbar>
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
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activities.map(item => (
                            <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}