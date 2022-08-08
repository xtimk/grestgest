import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BaseFormControl from '../formcontrol/BaseFormControl';

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
        <BaseFormControl insideElement={(
            <>
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
            </>
        )}/>
    );
}