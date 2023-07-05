import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil'; 

import theme from './theme/theme';
import { Router } from './router/Router';
import { LoginUserProvider } from './providers/LoginUserProvider';

const App = () => {
  return (
    <RecoilRoot> 
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <LoginUserProvider>
            <Router />
          </LoginUserProvider>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot> 
  );
};

export default App;


