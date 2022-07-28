import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Activity } from "../../app/models/activity"
import PageBar from "../pagebar/pagebar";

interface Props {
    activities: Activity[];
    addActivity: () => void;
}

export default function Activities({activities, addActivity}: Props) {
    return (
        <>
            <PageBar title="Activities"></PageBar>
            <Button size="large" variant="contained" onClick={addActivity}>Add Activity</Button>
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
        </>
    )
}