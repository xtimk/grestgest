import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

interface Props {
    open: boolean;
}

export default function HomeMenuItem({open}: Props) {
    return (
    <ListItem key="activity" disablePadding sx={{ display: 'block' }}>
        <ListItemButton sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
          }} 
          component={Link} to="/"
        >
          <ListItemIcon sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
          >
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    )
}