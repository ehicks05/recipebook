import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-supabase';
import { Auth } from '@supabase/ui';
import { supabase } from './supabase';
import App from './App';
import './index.css';

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
