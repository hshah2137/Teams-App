import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import AutoCall from './AutoCall';
import InputPage from './input';
import JoinCallPage from './joinCall';
import CreateCall from './createCall';

const App = () => { 
 
  return(
    <Router>

      <Routes>

       
        {/*<Route path = '/' element = {<InputPage/>} />
        <Route path = 'joinCall' element = {<JoinCallPage/>} />
        <Route path ='/' element = {<AutoCall/>} />*/}
        <Route path = '/' element = {<CreateCall/>} />


      </Routes>

    </Router>
    
 );
}
export default App;