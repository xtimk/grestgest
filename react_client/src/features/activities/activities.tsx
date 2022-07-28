import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Activity } from "../../app/models/activity"

interface Props {
    activities: Activity[];
    addActivity: () => void;
}

export default function Activities({activities, addActivity}: Props) {
    return (
        <>
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
            <button onClick={addActivity}>Add Activity</button>
        </>
    )
}