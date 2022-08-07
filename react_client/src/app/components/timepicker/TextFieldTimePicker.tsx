import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';

interface Props {
    label: string
    startingTime: string,
    setStartingTime: React.Dispatch<React.SetStateAction<string>>
}

export default function BasicTimePicker({label, setStartingTime} : Props) {
  const [value, setValue] = React.useState<Date | null>(null);

    const handleChange = (newValue : Date | null) => {
        setValue(newValue);
        setStartingTime(convertDateToString(newValue!));
    }

    function convertDateToString(date: Date) {
        let formattedDate = (moment(date)).format('HH:mm:ss')
        return formattedDate;
    }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}