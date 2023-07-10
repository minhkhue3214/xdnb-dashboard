import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { memo } from 'react';
import { ToastContainer } from 'react-toastify';
import styled, { createGlobalStyle } from 'styled-components';
import { useCustomizationStore } from './hooks/customization';

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
          <ToastContainerCustom />
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

    .ant-modal-root {
      z-index: 9999;
      position: relative;
    }

    .tox {
      z-index: 9999;
    }

    .tox-tinymce {
      margin-top: 10px;
    }

    .ant-select-dropdown{
      z-index: 9999;
    }

    .ant-picker-dropdown{
      z-index: 9999;
    }

    .ant-popover {
      z-index: 9999;
    }

    .mapboxgl-ctrl-logo {
      display: none;
    }

    .mapboxgl-compact {
      display: none;
    }

    .mapboxgl-ctrl-attrib {
      display: none;
    }

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

const ToastContainerCustom = styled(ToastContainer)`
  z-index: 10000;
`;
