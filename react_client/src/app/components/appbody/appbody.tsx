import { Divider, Grid } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AppRoutes from '../../routes/Routes';

export default function ApplicationBody() {
  return (
    <>
      <Grid container spacing={2} columns={16}>
        <Grid item xs={2} justifyContent="flex-end">
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={9}>
        <Divider />
        <AppRoutes />
        </Grid>
      </Grid>
      <ToastContainer />
    </>
  );
}