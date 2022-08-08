import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import BaseFormControl from '../formcontrol/BaseFormControl';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  label: string,
  setValue: React.Dispatch<React.SetStateAction<any>>,
  items: DropdownListItem[]
}

export interface DropdownListItem {
  value: any,
  renderedValue: string
}

export default function MultiSelectDropdownList({label, setValue, items}: Props) {
  const theme = useTheme();
  const [item, setItem] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;

    const itemsToSet = typeof value === 'string' ? value.split(',') : value;

    setItem(itemsToSet);
    setValue(itemsToSet);
  };

  return (
    <>
      <BaseFormControl insideElement={(
        <>
          <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
          <Select
            labelId={label + "-label-id"}
            id={label + "-id"}
            multiple
            value={item}
            onChange={handleChange}
            input={<OutlinedInput id={label + "-select-multiple-chip"} label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={items.find(i => (i.value === value))?.renderedValue} label={items.find(i => (i.value === value))?.renderedValue} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {items.map((dropdownitem) => (
              <MenuItem
                key={dropdownitem.value}
                value={dropdownitem.value}
                style={getStyles(dropdownitem.value, item, theme)}
              >
                {dropdownitem.renderedValue}
              </MenuItem>
            ))}
          </Select>
        </>
      )}/>
    </>
  );
}
