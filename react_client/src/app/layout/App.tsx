import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Activities from '../../features/activities/activities';
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

  return (
    <>
      <Typography variant='h3'>Grest Manager</Typography>
      <Activities activities={activities} addActivity={addActivity} />
    </>
  );
}

export default App;
