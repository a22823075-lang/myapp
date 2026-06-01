import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from '../components/Layout';
import GroupFight from '../pages/GroupFight';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <GroupFight />
    </Layout>
  </React.StrictMode>
);
