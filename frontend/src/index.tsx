import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Auth } from '@supabase/auth-ui-react';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { supabase } from './helpers/supabase';
import App from './App';
import './index.css';

const banner = String.raw`
______          _             ______             _    
| ___ \        (_)            | ___ \           | |   
| |_/ /___  ___ _ _ __   ___  | |_/ / ___   ___ | | __
|    // _ \/ __| | '_ \ / _ \ | ___ \/ _ \ / _ \| |/ /
| |\ \  __/ (__| | |_) |  __/ | |_/ / (_) | (_) |   < 
\_| \_\___|\___|_| .__/ \___| \____/ \___/ \___/|_|\_\
                 | |                                  
                 |_|                                  `;
console.log(banner);

const queryClient = new QueryClient();

ReactDOM.render(
  <Auth.UserContextProvider supabaseClient={supabase}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <QueryParamProvider
          adapter={ReactRouter6Adapter}
          options={{ removeDefaultsFromUrl: true }}
        >
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </Auth.UserContextProvider>,
  document.getElementById('root')
);
