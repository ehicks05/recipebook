import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-supabase';
import { Auth } from '@supabase/ui';
import { supabase } from './supabase';
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

ReactDOM.render(
  <Auth.UserContextProvider supabaseClient={supabase}>
    <Provider value={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth.UserContextProvider>,
  document.getElementById('root')
);
