import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import ApplicationBody from '../components/appbody/appbody';
import AppMenus from '../components/appmenus/AppMenus';

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
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: '#2c3e50 !important',
            color: 'white !important',
          },
        },
      },
    },
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <AppMenus darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <ApplicationBody />
    </ThemeProvider>
  );
}

export default App;
