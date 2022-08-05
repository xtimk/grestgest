import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
    open: boolean;
}

export default function PeriodMenuItem({open}: Props) {
    return (
    <ListItem key="activity" disablePadding sx={{ display: 'block' }}>
        <ListItemButton sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          }} 
          component={Link} to="/periods"
        >
          <ListItemIcon sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
          >
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Periodi" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    )
}