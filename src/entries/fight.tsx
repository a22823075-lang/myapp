import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import GroupFight from '../pages/GroupFight';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <GroupFight />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
