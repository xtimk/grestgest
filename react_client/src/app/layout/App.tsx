import { Container, CssBaseline, Divider, Drawer, List, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import Activities from '../../features/activities/activities';
import ApplicationBar from '../../features/appbar/appbar';
import { Activity } from '../models/activity';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/activity/GetAll')
      .then(response => response.json())
      .then(data => setActivities(data))
  }, [])

  function addActivity() {
    setActivities(prevState => [...prevState, {
      id: prevState.length + 200,
      name: "Falegnameria " + (prevState.length), 
      description: "Attivita di falegnameria",
      periodId: 4
    }])
  }
  
  const drawerWidth = 240;

  return (
    <>
      <CssBaseline></CssBaseline>
      <ApplicationBar></ApplicationBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
      </Drawer>
      <Divider />
        <List>
          <ListItem>AAAAA</ListItem>
        </List>
      <Container>
        <Activities activities={activities} addActivity={addActivity} />
      </Container>
    </>
  );
}

export default App;
