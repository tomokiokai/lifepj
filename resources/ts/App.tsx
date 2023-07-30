import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil'; 
import { useEffect } from 'react';
import axios from 'axios';

import theme from './theme/theme';
import { Router } from './router/Router';
import { LoginUserProvider } from './providers/LoginUserProvider';

const App = () => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

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

