import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HippyContentAgent from './hippy-agent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HippyContentAgent />
  </React.StrictMode>
);
