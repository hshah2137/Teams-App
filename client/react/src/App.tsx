import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import InputPage from './input';
import JoinCallPage from './joinCall';
import CreateCall from './createCall';
import CheckUser from './validateUser';
import ColorSchemesExample from './navbar';
import HomePage from './home';

const App = () => { 
 
  return(
    <div className = "wrapper">
    <Router>
      <ColorSchemesExample />
      <Routes>
        
        {/*<Route path ='/' element = {<AutoCall/>} />
        <Route path = '/createCall' element = {<CreateCall/>} />*/}
        <Route path = '/' element = {<HomePage />} />
        <Route path = '/validateUser' element = {<CheckUser/>} />
        <Route path = '/createCall' element = {<CreateCall/>} />
        <Route path = '/input' element = {<InputPage/>} />
        <Route path = '/joinCall' element = {<JoinCallPage/>} />
      </Routes>

    </Router>
    </div>
 );
}
export default App;