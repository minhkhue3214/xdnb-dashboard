import { memo } from 'react';
import { useCustomizationStore } from './hooks/customization';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from '~/routes';

// defaultTheme
import themes from '~/themes';

// project imports
import NavigationScroll from '~/layout/NavigationScroll';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { customizationState } = useCustomizationStore();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customizationState)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
          <ToastContainer />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default memo(App);
