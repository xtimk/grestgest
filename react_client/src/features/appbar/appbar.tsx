import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ApplicationBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Grest Manager App
            </Typography>
            <Button color="inherit">Activities</Button>
            <Button color="inherit">Periods</Button>
            <Button color="inherit">Intervals</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}