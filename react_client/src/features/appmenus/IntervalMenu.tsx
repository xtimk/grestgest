import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';

interface Props {
    open: boolean;
}

export default function IntervalMenuItem({open}: Props) {
    return (
    <ListItem key="intervals" disablePadding sx={{ display: 'block' }}>
        <ListItemButton sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          }} 
          component={Link} to="/intervals"
        >
          <ListItemIcon sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
          >
            <UpdateIcon />
          </ListItemIcon>
          <ListItemText primary="Intervalli" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    )
}