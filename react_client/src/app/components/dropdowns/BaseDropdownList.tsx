import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    label: string,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    items: DropdownListItem[]
}

export interface DropdownListItem {
    value: any,
    renderedValue: string
}

export default function BasicSelect({label, setValue, items}: Props) {
    const [item, setItem] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setItem(event.target.value as string);
        handleTextChange(event.target.value, setValue);
    };

    function handleTextChange(value: string, func: React.Dispatch<React.SetStateAction<any>>) {
        func(value);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id={label + "-label-id"}>{label}</InputLabel>
                <Select
                    labelId={label + "-id"}
                    id="demo-simple-select"
                    value={item}
                    label={label}
                    onChange={handleChange}
                >
                {items.map((item) => (
                    <MenuItem value={item.value}>{item.renderedValue}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Box>
    );
}