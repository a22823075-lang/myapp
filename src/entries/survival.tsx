import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from '../components/Layout';
import SurvivalTips from '../pages/SurvivalTips';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <SurvivalTips />
    </Layout>
  </React.StrictMode>
);
