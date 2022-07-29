import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import AboutPage from '../../features/about/AboutPage';
import ApplicationBar from '../../features/appbar/appbar';
import ApplicationBody from '../../features/appbody/appbody';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default:  paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
    // components: {
    //   MuiAppBar: {
    //     styleOverrides: {
    //       colorPrimary: {
    //         backgroundColor: paletteType === 'light' ? '#eaeaea' : '#121212'
    //       }
    //     }
    //   }
    // }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <ApplicationBar darkMode={darkMode} handleThemeChange={handleThemeChange}></ApplicationBar>
      <Container>
        <ApplicationBody />
      </Container>
    </ThemeProvider>
  );
}

export default App;
