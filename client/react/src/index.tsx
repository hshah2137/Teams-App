import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import { initializeIcons } from '@fluentui/react/lib/Icons';
import './index.css';
//import ColorSchemesExample from './navbar';

       

ReactDOM.render(
  <div className="wrapper">
    
    <App />
  </div>,
  document.getElementById('root')
);

initializeIcons();
