import { FormControl } from "@mui/material"

interface Props {
    insideElement: any
}

export default function BaseFormControl({insideElement}: Props) {
    return (
        <FormControl sx={{ m: 1, width: 400 }}>
            {insideElement}
        </FormControl>
    )
}