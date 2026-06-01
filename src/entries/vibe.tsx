import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from '../components/Layout';
import VibeCheck from '../pages/VibeCheck';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <VibeCheck />
    </Layout>
  </React.StrictMode>
);
