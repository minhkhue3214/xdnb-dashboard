import { memo } from 'react';
import { useCustomizationStore } from './hooks/customization';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createGlobalStyle } from 'styled-components';

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
          <GlobalStyle />
          <Routes />
          <ToastContainer />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default memo(App);

const GlobalStyle = createGlobalStyle`
  
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    #root {
      width: 100%;
      height: 100%;
      display: flex;
      overflow: hidden;

      & > *:first-child {
        min-width: 100%;
      }
    }

    &::-webkit-scrollbar{
      background:transparent;
      height:8px;
      width:8px
    }

    &::-webkit-scrollbar-track{
      margin:3px 0
    }

    &::-webkit-scrollbar-thumb{
      border:none;
      box-shadow:none;
      background:#dadce0;
      border-radius:4px;
      min-height:40px
    }

    &:hover::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:hover{
      background:#bdc1c6
    }

    *::-webkit-scrollbar-thumb:active{
      background:#9aa0a6
    }

    *::-webkit-scrollbar{
      background:transparent;
      height:8px;
      width:8px
    }

    *::-webkit-scrollbar-track{
      margin:3px 0
    }

    *::-webkit-scrollbar-thumb{
      border:none;
      box-shadow:none;
      background:#dadce0;
      border-radius:4px;
      min-height:40px
    }

    *:hover::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:hover{
      background:#bdc1c6
    }

    *::-webkit-scrollbar-thumb:active{
      background:#9aa0a6
    }
  }
}
`;
