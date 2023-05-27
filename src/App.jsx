import { useCustomizationStore } from './hooks/customization';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from '~/routes';

// defaultTheme
import themes from '~/themes';

// project imports
import NavigationScroll from '~/layout/NavigationScroll';

const App = () => {
  const { customizationState } = useCustomizationStore();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customizationState)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
