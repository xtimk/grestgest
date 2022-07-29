import Activities from '../activities/activities';
import { Divider, Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import AboutPage from '../about/AboutPage';


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
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}