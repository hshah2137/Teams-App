import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import {  
  CallComposite, 
  fromFlatCommunicationIdentifier, 
  useAzureCommunicationCallAdapter 
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import AutoCall from './AutoCall';
import InputPage from './input';

const App = () => { 
 
  return(
    <Router>

      <Routes>

        <Route path = '/' element = {<AutoCall/>} />
        <Route path = '/input' element = {<InputPage/>} />

      </Routes>

    </Router>
    
 );
}
export default App;