import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Switch } from '@mui/material';

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function ApplicationBar({darkMode, handleThemeChange}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Grest Manager App
            </Typography>
            <Switch onChange={handleThemeChange} checked={darkMode}></Switch>
            <Button color="inherit">Activities</Button>
            <Button color="inherit">Periods</Button>
            <Button color="inherit">Intervals</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}