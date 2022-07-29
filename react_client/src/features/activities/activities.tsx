import { Button, Container, Divider, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
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
            <Toolbar title="Activities">
                <Typography variant="h4">Activities</Typography>
            </Toolbar>
            <Divider></Divider>
            <Toolbar></Toolbar>
            <Container>
                <Button size="large" variant="contained" onClick={addActivity}>Add Activity</Button>
            </Container>
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