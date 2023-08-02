import './App.css';
import { BrowserRouter as Router, Routes, Route }from 'react-router-dom';
import AutoCall from './AutoCall';
import InputPage from './input';
import JoinCallPage from './joinCall';

const App = () => { 
 
  return(
    <Router>

      <Routes>

       
        {/*<Route path = '/' element = {<InputPage/>} />
        <Route path = 'joinCall' element = {<JoinCallPage/>} />*/}
        <Route path ='/' element = {<AutoCall/>} />


      </Routes>

    </Router>
    
 );
}
export default App;