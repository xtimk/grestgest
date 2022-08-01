import { Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Toolbar, Typography } from "@mui/material";

import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import UpdateIcon from '@mui/icons-material/Update';

import { Link } from "react-router-dom";


const activityCard = (
    <Card sx={{ maxWidth: 200 }}>
    <CardActionArea component={Link} to="/activities">
      <CardMedia />
      <CardContent> 
        <Typography gutterBottom variant="h5" component="div" align="center">
            <SportsHandballIcon fontSize="large" />
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Attività
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

const periodCard = (
    <Card sx={{ maxWidth: 200 }}>
    <CardActionArea component={Link} to="/periods">
      <CardMedia />
      <CardContent> 
        <Typography gutterBottom variant="h5" component="div" align="center">
            <AccessTimeIcon fontSize="large" />
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Periodi
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

const intervalCard = (
    <Card sx={{ maxWidth: 200 }}>
    <CardActionArea component={Link} to="/intervals">
      <CardMedia />
      <CardContent> 
        <Typography gutterBottom variant="h5" component="div" align="center">
            <UpdateIcon fontSize="large" />
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Intervalli
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
)

const cards = [activityCard, periodCard, intervalCard]

export default function Home() {
    return (
        <>
            <Toolbar />
            <Divider />
            <Toolbar>
                <Typography variant="h6">Home</Typography>
            </Toolbar>
            <Divider />
            <Toolbar />
            <Toolbar>
                <Grid container spacing={2}>
                {cards.map(card => (
                        <Grid item xs={2}>
                            {card}
                        </Grid>
                ))}
                </Grid>
            </Toolbar>
        </>
    )
}