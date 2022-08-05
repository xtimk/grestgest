import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { AppTableParams } from "../../models/apptable";

interface Props {
    tableParams: AppTableParams
}

export default function AppTable({tableParams}: Props) {
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    {tableParams.headers.map((item) => (
                        <TableCell>{item}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {tableParams.body.map((row) => (
                        <>
                            <TableRow key={row.id}></TableRow>
                            {tableParams.keysToRender.map((item) => (
                                <>
                                    <TableCell>{row[item as keyof typeof row]}</TableCell>
                                </>
                            ))}
                        </>
                    )
                )}
            </TableBody>
        </Table>
    </TableContainer>
}