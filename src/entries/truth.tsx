import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from '../components/Layout';
import TheTruth from '../pages/TheTruth';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <TheTruth />
    </Layout>
  </React.StrictMode>
);
