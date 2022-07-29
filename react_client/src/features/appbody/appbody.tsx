import Activities from '../activities/activities';
import { Divider, Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../about/AboutPage';
import Stepper1 from '../wizard/Wizard1';
import Dialog1 from '../dialogs/Dialog1';


export default function ApplicationBody() {
  return (
    <>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={2} justifyContent="flex-end">
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={9}>
        <Divider />
          <Routes>
              <Route path='/' element={<Activities />}></Route>
              <Route path='/about' element={<AboutPage />}></Route>
              <Route path='/wizard' element={<Stepper1 />}></Route>
              <Route path='/dialog' element={<Dialog1 />}></Route>
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}