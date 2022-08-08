import { TextField } from "@mui/material";
import BaseFormControl from "../formcontrol/BaseFormControl";

interface Props {
    label: string,
    setValue: React.Dispatch<React.SetStateAction<any>>,
}

export default function BasicTextField({label, setValue}: Props) {

    function handleTextChange(value: string, func: React.Dispatch<React.SetStateAction<any>>) {
        func(value);
    }

    return (
        <BaseFormControl insideElement={(
            <TextField 
                id={label + "-id"}
                label={label} 
                variant="outlined" 
                onChange={(e) => handleTextChange(e.target.value, setValue)}/>
        )}/>
    )
}