import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Props {
    title: string;
}

export default function PageBar({title}: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                {title}
            </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}