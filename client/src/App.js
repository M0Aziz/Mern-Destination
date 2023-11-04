import './App.css';
import Add from './components/AddDestination';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DisplayAll from './components/DisplayAll';
import UpdateDestination from './components/UpdateDestination';
import OneDestionation from './components/OneDestination'
function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Routes>
      <Route path='/add' element={<Add/>}/>
      <Route path='/' element={<DisplayAll/>}/>
      <Route path='/edit/:id' element={<UpdateDestination/>}/>

      <Route path='/view/:id' element={<OneDestionation/>}/>

      
     
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
