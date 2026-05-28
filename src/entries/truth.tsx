import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import TheTruth from '../pages/TheTruth';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <TheTruth />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
